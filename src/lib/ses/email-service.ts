

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
    // Development mode: log email instead of failing
    console.log('\n📧 EMAIL WOULD BE SENT (SES not configured):')
    console.log('═'.repeat(50))
    console.log(`📬 To: ${to}`)
    console.log(`📝 Subject: ${subject}`)
    console.log(`🎯 From: ${SES_CONFIG.fromName} <${SES_CONFIG.fromEmail}>`)
    console.log('─'.repeat(50))
    console.log('📄 Text Content:')
    console.log(textBody)
    console.log('─'.repeat(50))
    console.log('🌐 HTML Content Preview:')
    console.log(htmlBody.substring(0, 200) + '...')
    console.log('═'.repeat(50))
    console.log('ℹ️  To send real emails, configure AWS SES:')
    console.log('  - Set AWS_ACCESS_KEY_ID to your AWS access key')
    console.log('  - Set AWS_SECRET_ACCESS_KEY to your AWS secret key') 
    console.log('  - Set AWS_SES_FROM_EMAIL to your verified SES email')
    console.log('═'.repeat(50))
    
    // Return success in development mode so the flow continues
    return {
      success: true,
      messageId: 'dev-mode-' + Date.now(),
      error: 'Development mode: Email logged to console instead of sent'
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
