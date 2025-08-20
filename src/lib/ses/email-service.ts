

import { SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses'
import { sesClient, SES_CONFIG, isSESConfigured } from './client'
import { 
  getEmailVerificationTemplate, 
  getPasswordResetTemplate, 
  getNotaryStatusTemplate,
  EmailVerificationData,
  PasswordResetData,
  NotaryStatusData 
} from './templates'

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

// Base email sending function
async function sendEmail(to: string, subject: string, htmlBody: string, textBody: string): Promise<EmailResult> {
  if (!isSESConfigured()) {
    console.warn('SES is not configured. Email would be sent to:', to)
    console.warn('Subject:', subject)
    console.warn('Body preview:', textBody.substring(0, 100) + '...')
    
    return {
      success: false,
      error: 'SES not configured. Check environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SES_FROM_EMAIL'
    }
  }

  try {
    const params: SendEmailCommandInput = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlBody,
          },
          Text: {
            Charset: 'UTF-8',
            Data: textBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: `${SES_CONFIG.fromName} <${SES_CONFIG.fromEmail}>`,
    }

    const command = new SendEmailCommand(params)
    const response = await sesClient.send(command)

    console.log(`Email sent successfully to ${to}. MessageId: ${response.MessageId}`)

    return {
      success: true,
      messageId: response.MessageId,
    }
  } catch (error) {
    console.error('Error sending email:', error)
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

// Send email verification
export async function sendEmailVerification(to: string, data: EmailVerificationData): Promise<EmailResult> {
  const template = getEmailVerificationTemplate(data)
  
  return sendEmail(
    to,
    template.subject,
    template.html,
    template.text
  )
}

// Send password reset email
export async function sendPasswordReset(to: string, data: PasswordResetData): Promise<EmailResult> {
  const template = getPasswordResetTemplate(data)
  
  return sendEmail(
    to,
    template.subject,
    template.html,
    template.text
  )
}

// Send notary status update
export async function sendNotaryStatusUpdate(to: string, data: NotaryStatusData): Promise<EmailResult> {
  const template = getNotaryStatusTemplate(data)
  
  return sendEmail(
    to,
    template.subject,
    template.html,
    template.text
  )
}

// Utility function to validate email address
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Rate limiting helper (simple in-memory implementation)
const emailRateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 5 // Max emails per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

export function checkEmailRateLimit(email: string): { allowed: boolean; remainingTime?: number } {
  const now = Date.now()
  const key = email.toLowerCase()
  const record = emailRateLimit.get(key)

  if (!record || now > record.resetTime) {
    // First request or window expired
    emailRateLimit.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    // Rate limit exceeded
    return { 
      allowed: false, 
      remainingTime: record.resetTime - now 
    }
  }

  // Increment count
  record.count++
  emailRateLimit.set(key, record)
  return { allowed: true }
}

// Clean up old rate limit records periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of emailRateLimit.entries()) {
    if (now > record.resetTime) {
      emailRateLimit.delete(key)
    }
  }
}, 60 * 60 * 1000) // Clean up every hour
