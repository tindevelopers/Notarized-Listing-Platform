

export interface EmailVerificationData {
  userName: string
  verificationCode: string
  supportEmail?: string
}

export interface PasswordResetData {
  userName: string
  resetLink: string
  supportEmail?: string
}

export interface NotaryStatusData {
  notaryName: string
  status: 'approved' | 'rejected' | 'pending'
  message?: string
  nextSteps?: string
  supportEmail?: string
}

// Email verification template
export function getEmailVerificationTemplate(data: EmailVerificationData): { subject: string; html: string; text: string } {
  const { userName, verificationCode, supportEmail = 'support@notarized.com' } = data

  return {
    subject: 'Your Verification Code - Notarized Platform',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .code-container { 
              text-align: center;
              margin: 30px 0;
              padding: 20px;
              background: white;
              border-radius: 8px;
              border: 2px solid #667eea;
            }
            .verification-code { 
              font-size: 36px;
              font-weight: bold;
              color: #667eea;
              letter-spacing: 8px;
              font-family: 'Courier New', monospace;
              margin: 10px 0;
            }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to Notarized Platform!</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>Thank you for creating an account with Notarized Platform. To complete your registration and start using our services, please enter the verification code below in the app:</p>
            
            <div class="code-container">
              <p style="margin: 0; color: #666; font-size: 14px;">Your verification code is:</p>
              <div class="verification-code">${verificationCode}</div>
              <p style="margin: 0; color: #666; font-size: 12px;">Enter this code in the verification form</p>
            </div>
            
            <div class="warning">
              <strong>Important:</strong> This verification code will expire in 15 minutes for security reasons.
            </div>
            
            <p><strong>Instructions:</strong></p>
            <ol>
              <li>Return to the Notarized Platform app</li>
              <li>Enter the 6-digit code above in the verification form</li>
              <li>Click "Verify" to activate your account</li>
            </ol>
            
            <p>If you didn't create an account with us, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Need help? Contact us at <a href="mailto:${supportEmail}">${supportEmail}</a></p>
            <p>© 2025 Notarized Platform. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to Notarized Platform!
      
      Hello ${userName}!
      
      Thank you for creating an account with Notarized Platform. To complete your registration and start using our services, please enter the verification code below in the app:
      
      YOUR VERIFICATION CODE: ${verificationCode}
      
      Instructions:
      1. Return to the Notarized Platform app
      2. Enter the 6-digit code above in the verification form  
      3. Click "Verify" to activate your account
      
      Important: This verification code will expire in 15 minutes for security reasons.
      
      If you didn't create an account with us, please ignore this email.
      
      Need help? Contact us at ${supportEmail}
      
      © 2025 Notarized Platform. All rights reserved.
    `
  }
}

// Password reset template
export function getPasswordResetTemplate(data: PasswordResetData): { subject: string; html: string; text: string } {
  const { userName, resetLink, supportEmail = 'support@notarized.com' } = data

  return {
    subject: 'Reset Your Password - Notarized Platform',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { 
              display: inline-block; 
              padding: 14px 28px; 
              background: #dc3545; 
              color: white; 
              text-decoration: none; 
              border-radius: 6px; 
              font-weight: bold; 
              margin: 20px 0;
            }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>You have requested to reset your password for your Notarized Platform account. Click the button below to create a new password.</p>
            
            <div style="text-align: center;">
              <a href="${resetLink}" class="button">Reset Password</a>
            </div>
            
            <div class="warning">
              <strong>Important:</strong> This reset link will expire in 1 hour for security reasons.
            </div>
            
            <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px;">${resetLink}</p>
            
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
          </div>
          <div class="footer">
            <p>Need help? Contact us at <a href="mailto:${supportEmail}">${supportEmail}</a></p>
            <p>© 2025 Notarized Platform. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Password Reset Request - Notarized Platform
      
      Hello ${userName}!
      
      You have requested to reset your password for your Notarized Platform account. Click the link below to create a new password:
      
      ${resetLink}
      
      Important: This reset link will expire in 1 hour for security reasons.
      
      If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
      
      Need help? Contact us at ${supportEmail}
      
      © 2025 Notarized Platform. All rights reserved.
    `
  }
}

// Notary status update template
export function getNotaryStatusTemplate(data: NotaryStatusData): { subject: string; html: string; text: string } {
  const { notaryName, status, message, nextSteps, supportEmail = 'support@notarized.com' } = data

  const statusConfig = {
    approved: {
      color: '#28a745',
      title: 'Application Approved!',
      icon: '✅'
    },
    rejected: {
      color: '#dc3545',
      title: 'Application Update',
      icon: '❌'
    },
    pending: {
      color: '#ffc107',
      title: 'Application Under Review',
      icon: '⏳'
    }
  }

  const config = statusConfig[status]

  return {
    subject: `Notary Application ${status === 'approved' ? 'Approved' : status === 'rejected' ? 'Update' : 'Status'} - Notarized Platform`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Notary Application Status</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .status-badge { 
              display: inline-block; 
              padding: 12px 24px; 
              background: ${config.color}; 
              color: white; 
              border-radius: 25px; 
              font-weight: bold; 
              margin: 20px 0;
              text-transform: uppercase;
            }
            .message-box { background: white; border-left: 4px solid ${config.color}; padding: 20px; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${config.icon} ${config.title}</h1>
          </div>
          <div class="content">
            <h2>Hello ${notaryName}!</h2>
            <p>We have an update regarding your notary application with Notarized Platform.</p>
            
            <div style="text-align: center;">
              <div class="status-badge">${status}</div>
            </div>
            
            ${message ? `
              <div class="message-box">
                <h3>Details:</h3>
                <p>${message}</p>
              </div>
            ` : ''}
            
            ${nextSteps ? `
              <div class="message-box">
                <h3>Next Steps:</h3>
                <p>${nextSteps}</p>
              </div>
            ` : ''}
            
            ${status === 'approved' ? `
              <p>Congratulations! You can now start accepting bookings and providing notary services through our platform.</p>
            ` : status === 'rejected' ? `
              <p>While we cannot approve your application at this time, we encourage you to review the feedback and reapply when ready.</p>
            ` : `
              <p>We're currently reviewing your application and will notify you once a decision has been made.</p>
            `}
          </div>
          <div class="footer">
            <p>Need help? Contact us at <a href="mailto:${supportEmail}">${supportEmail}</a></p>
            <p>© 2025 Notarized Platform. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
    text: `
      ${config.title} - Notarized Platform
      
      Hello ${notaryName}!
      
      We have an update regarding your notary application with Notarized Platform.
      
      Status: ${status.toUpperCase()}
      
      ${message ? `Details: ${message}` : ''}
      
      ${nextSteps ? `Next Steps: ${nextSteps}` : ''}
      
      ${status === 'approved' ? 
        'Congratulations! You can now start accepting bookings and providing notary services through our platform.' : 
        status === 'rejected' ? 
        'While we cannot approve your application at this time, we encourage you to review the feedback and reapply when ready.' : 
        'We\'re currently reviewing your application and will notify you once a decision has been made.'
      }
      
      Need help? Contact us at ${supportEmail}
      
      © 2025 Notarized Platform. All rights reserved.
    `
  }
}
