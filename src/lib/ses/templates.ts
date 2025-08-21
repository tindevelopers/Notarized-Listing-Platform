

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
    subject: 'Account Verification Required - Notarized',
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Verification - Notarized</title>
          <style>
            * { box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #2c3e50; 
              background-color: #f8f9fa; 
              margin: 0; 
              padding: 20px; 
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: white; 
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); 
              border-radius: 12px; 
              overflow: hidden; 
            }
            .header { 
              background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
            }
            .header h1 { 
              margin: 0 0 8px 0; 
              font-size: 28px; 
              font-weight: 600; 
              letter-spacing: -0.5px; 
            }
            .header .subtitle { 
              margin: 0; 
              opacity: 0.9; 
              font-size: 16px; 
              font-weight: 400; 
            }
            .content { 
              padding: 40px 30px; 
              background: white; 
            }
            .greeting { 
              font-size: 18px; 
              color: #2c3e50; 
              margin-bottom: 24px; 
              font-weight: 500; 
            }
            .main-text { 
              font-size: 16px; 
              line-height: 1.7; 
              color: #4a5568; 
              margin-bottom: 32px; 
            }
            .code-section { 
              background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); 
              border: 2px solid #e2e8f0; 
              border-radius: 12px; 
              padding: 32px; 
              text-align: center; 
              margin: 32px 0; 
            }
            .code-label { 
              color: #4a5568; 
              font-size: 14px; 
              font-weight: 500; 
              margin-bottom: 12px; 
              text-transform: uppercase; 
              letter-spacing: 0.5px; 
            }
            .verification-code { 
              font-family: 'Courier New', monospace; 
              font-size: 32px; 
              font-weight: bold; 
              color: #1e3c72; 
              letter-spacing: 6px; 
              margin: 16px 0; 
              padding: 12px 24px; 
              background: white; 
              border-radius: 8px; 
              border: 1px solid #cbd5e0; 
              display: inline-block; 
            }
            .code-instruction { 
              color: #718096; 
              font-size: 13px; 
              margin-top: 12px; 
            }
            .security-notice { 
              background: #fef5e7; 
              border: 1px solid #f6ad55; 
              border-radius: 8px; 
              padding: 16px; 
              margin: 24px 0; 
            }
            .security-notice .title { 
              color: #c05621; 
              font-weight: 600; 
              margin-bottom: 8px; 
              font-size: 14px; 
            }
            .security-notice .text { 
              color: #9c4221; 
              font-size: 14px; 
              margin: 0; 
            }
            .instructions { 
              background: #f7fafc; 
              border-radius: 8px; 
              padding: 24px; 
              margin: 24px 0; 
            }
            .instructions h3 { 
              color: #2d3748; 
              font-size: 16px; 
              margin: 0 0 16px 0; 
              font-weight: 600; 
            }
            .instructions ol { 
              margin: 0; 
              padding-left: 20px; 
            }
            .instructions li { 
              color: #4a5568; 
              font-size: 14px; 
              margin-bottom: 8px; 
              line-height: 1.6; 
            }
            .footer { 
              background: #f8f9fa; 
              padding: 30px; 
              text-align: center; 
              border-top: 1px solid #e2e8f0; 
            }
            .footer-text { 
              color: #718096; 
              font-size: 14px; 
              margin: 0 0 12px 0; 
            }
            .footer-link { 
              color: #1e3c72; 
              text-decoration: none; 
              font-weight: 500; 
            }
            .footer-link:hover { 
              text-decoration: underline; 
            }
            .footer-copyright { 
              color: #a0aec0; 
              font-size: 12px; 
              margin-top: 16px; 
            }
            .disclaimer { 
              color: #718096; 
              font-size: 14px; 
              font-style: italic; 
              margin-top: 24px; 
              padding: 16px; 
              background: #f7fafc; 
              border-radius: 6px; 
              border-left: 3px solid #cbd5e0; 
            }
            @media only screen and (max-width: 480px) {
              body { padding: 10px; }
              .header, .content, .footer { padding: 20px; }
              .verification-code { font-size: 24px; letter-spacing: 4px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>NOTARIZED</h1>
              <p class="subtitle">Professional Notary Services Platform</p>
            </div>
            
            <div class="content">
              <div class="greeting">Dear ${userName},</div>
              
              <div class="main-text">
                Thank you for registering with Notarized. To ensure the security of your account and complete the registration process, we require email verification.
              </div>
              
              <div class="code-section">
                <div class="code-label">Verification Code</div>
                <div class="verification-code">${verificationCode}</div>
                <div class="code-instruction">Enter this 6-digit code to verify your account</div>
              </div>
              
              <div class="security-notice">
                <div class="title">Security Information</div>
                <div class="text">This verification code will expire in 15 minutes. For your security, do not share this code with anyone.</div>
              </div>
              
              <div class="instructions">
                <h3>Verification Steps</h3>
                <ol>
                  <li>Return to the Notarized application</li>
                  <li>Locate the email verification form</li>
                  <li>Enter the 6-digit verification code provided above</li>
                  <li>Select "Verify Account" to complete the process</li>
                </ol>
              </div>
              
              <div class="disclaimer">
                If you did not create an account with Notarized, please disregard this message. No further action is required, and your email address will not be used.
              </div>
            </div>
            
            <div class="footer">
              <p class="footer-text">
                Need assistance? Our support team is available to help.<br>
                Contact us at <a href="mailto:${supportEmail}" class="footer-link">${supportEmail}</a>
              </p>
              <div class="footer-copyright">
                © 2025 Notarized Professional Services. All rights reserved.<br>
                This is an automated message. Please do not reply to this email.
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      NOTARIZED - Professional Notary Services Platform
      Account Verification Required
      
      Dear ${userName},
      
      Thank you for registering with Notarized. To ensure the security of your account and complete the registration process, we require email verification.
      
      VERIFICATION CODE: ${verificationCode}
      
      VERIFICATION STEPS:
      1. Return to the Notarized application
      2. Locate the email verification form
      3. Enter the 6-digit verification code: ${verificationCode}
      4. Select "Verify Account" to complete the process
      
      SECURITY INFORMATION:
      This verification code will expire in 15 minutes. For your security, do not share this code with anyone.
      
      If you did not create an account with Notarized, please disregard this message. No further action is required, and your email address will not be used.
      
      Need assistance? Our support team is available to help.
      Contact us at ${supportEmail}
      
      © 2025 Notarized Professional Services. All rights reserved.
      This is an automated message. Please do not reply to this email.
    `
  }
}

// Password reset template
export function getPasswordResetTemplate(data: PasswordResetData): { subject: string; html: string; text: string } {
  const { userName, resetLink, supportEmail = 'support@notarized.com' } = data

  return {
    subject: 'Password Reset Request - Notarized',
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - Notarized</title>
          <style>
            * { box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #2c3e50; 
              background-color: #f8f9fa; 
              margin: 0; 
              padding: 20px; 
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: white; 
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); 
              border-radius: 12px; 
              overflow: hidden; 
            }
            .header { 
              background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
            }
            .header h1 { 
              margin: 0 0 8px 0; 
              font-size: 28px; 
              font-weight: 600; 
              letter-spacing: -0.5px; 
            }
            .header .subtitle { 
              margin: 0; 
              opacity: 0.9; 
              font-size: 16px; 
              font-weight: 400; 
            }
            .content { 
              padding: 40px 30px; 
              background: white; 
            }
            .greeting { 
              font-size: 18px; 
              color: #2c3e50; 
              margin-bottom: 24px; 
              font-weight: 500; 
            }
            .main-text { 
              font-size: 16px; 
              line-height: 1.7; 
              color: #4a5568; 
              margin-bottom: 32px; 
            }
            .button-section { 
              text-align: center; 
              margin: 32px 0; 
            }
            .reset-button { 
              display: inline-block; 
              background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); 
              color: white; 
              text-decoration: none; 
              padding: 16px 32px; 
              border-radius: 8px; 
              font-weight: 600; 
              font-size: 16px; 
              box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3); 
              transition: all 0.3s ease; 
            }
            .reset-button:hover { 
              transform: translateY(-2px); 
              box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4); 
            }
            .security-notice { 
              background: #fef5e7; 
              border: 1px solid #f6ad55; 
              border-radius: 8px; 
              padding: 16px; 
              margin: 24px 0; 
            }
            .security-notice .title { 
              color: #c05621; 
              font-weight: 600; 
              margin-bottom: 8px; 
              font-size: 14px; 
            }
            .security-notice .text { 
              color: #9c4221; 
              font-size: 14px; 
              margin: 0; 
            }
            .alternative-link { 
              background: #f7fafc; 
              border: 1px solid #e2e8f0; 
              border-radius: 8px; 
              padding: 16px; 
              margin: 24px 0; 
            }
            .alternative-link .title { 
              color: #2d3748; 
              font-weight: 600; 
              margin-bottom: 8px; 
              font-size: 14px; 
            }
            .alternative-link .url { 
              word-break: break-all; 
              font-family: 'Courier New', monospace; 
              background: #edf2f7; 
              padding: 12px; 
              border-radius: 4px; 
              border: 1px solid #cbd5e0; 
              color: #4a5568; 
              font-size: 13px; 
            }
            .footer { 
              background: #f8f9fa; 
              padding: 30px; 
              text-align: center; 
              border-top: 1px solid #e2e8f0; 
            }
            .footer-text { 
              color: #718096; 
              font-size: 14px; 
              margin: 0 0 12px 0; 
            }
            .footer-link { 
              color: #1e3c72; 
              text-decoration: none; 
              font-weight: 500; 
            }
            .footer-link:hover { 
              text-decoration: underline; 
            }
            .footer-copyright { 
              color: #a0aec0; 
              font-size: 12px; 
              margin-top: 16px; 
            }
            .disclaimer { 
              color: #718096; 
              font-size: 14px; 
              font-style: italic; 
              margin-top: 24px; 
              padding: 16px; 
              background: #f7fafc; 
              border-radius: 6px; 
              border-left: 3px solid #cbd5e0; 
            }
            @media only screen and (max-width: 480px) {
              body { padding: 10px; }
              .header, .content, .footer { padding: 20px; }
              .reset-button { padding: 14px 24px; font-size: 14px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>NOTARIZED</h1>
              <p class="subtitle">Professional Notary Services Platform</p>
            </div>
            
            <div class="content">
              <div class="greeting">Dear ${userName},</div>
              
              <div class="main-text">
                We have received a request to reset the password for your Notarized account. To proceed with updating your password, please use the secure link provided below.
              </div>
              
              <div class="button-section">
                <a href="${resetLink}" class="reset-button">Reset Password</a>
              </div>
              
              <div class="security-notice">
                <div class="title">Security Information</div>
                <div class="text">This password reset link will expire in 1 hour for security purposes. Please complete the reset process promptly.</div>
              </div>
              
              <div class="alternative-link">
                <div class="title">Alternative Access</div>
                <div>If the button above does not function properly, please copy and paste the following URL into your web browser:</div>
                <div class="url">${resetLink}</div>
              </div>
              
              <div class="disclaimer">
                If you did not request a password reset for your Notarized account, please disregard this message. Your current password will remain active and unchanged. For security concerns, please contact our support team immediately.
              </div>
            </div>
            
            <div class="footer">
              <p class="footer-text">
                Need assistance? Our support team is available to help.<br>
                Contact us at <a href="mailto:${supportEmail}" class="footer-link">${supportEmail}</a>
              </p>
              <div class="footer-copyright">
                © 2025 Notarized Professional Services. All rights reserved.<br>
                This is an automated message. Please do not reply to this email.
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      NOTARIZED - Professional Notary Services Platform
      Password Reset Request
      
      Dear ${userName},
      
      We have received a request to reset the password for your Notarized account. To proceed with updating your password, please use the secure link provided below.
      
      RESET LINK: ${resetLink}
      
      SECURITY INFORMATION:
      This password reset link will expire in 1 hour for security purposes. Please complete the reset process promptly.
      
      If you did not request a password reset for your Notarized account, please disregard this message. Your current password will remain active and unchanged. For security concerns, please contact our support team immediately.
      
      Need assistance? Our support team is available to help.
      Contact us at ${supportEmail}
      
      © 2025 Notarized Professional Services. All rights reserved.
      This is an automated message. Please do not reply to this email.
    `
  }
}

// Notary status update template
export function getNotaryStatusTemplate(data: NotaryStatusData): { subject: string; html: string; text: string } {
  const { notaryName, status, message, nextSteps, supportEmail = 'support@notarized.com' } = data

  const statusConfig = {
    approved: {
      color: '#059669',
      bgColor: '#ecfdf5',
      borderColor: '#10b981',
      title: 'Application Approved',
      icon: '✓',
      description: 'Your notary application has been successfully approved.'
    },
    rejected: {
      color: '#dc2626',
      bgColor: '#fef2f2',
      borderColor: '#ef4444',
      title: 'Application Requires Attention',
      icon: '!',
      description: 'Your notary application requires additional information or modifications.'
    },
    pending: {
      color: '#d97706',
      bgColor: '#fffbeb',
      borderColor: '#f59e0b',
      title: 'Application Under Review',
      icon: '•',
      description: 'Your notary application is currently being processed by our team.'
    }
  }

  const config = statusConfig[status]

  return {
    subject: `Notary Application ${status === 'approved' ? 'Approved' : status === 'rejected' ? 'Status Update' : 'Under Review'} - Notarized`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Notary Application Status - Notarized</title>
          <style>
            * { box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #2c3e50; 
              background-color: #f8f9fa; 
              margin: 0; 
              padding: 20px; 
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: white; 
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); 
              border-radius: 12px; 
              overflow: hidden; 
            }
            .header { 
              background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
            }
            .header h1 { 
              margin: 0 0 8px 0; 
              font-size: 28px; 
              font-weight: 600; 
              letter-spacing: -0.5px; 
            }
            .header .subtitle { 
              margin: 0; 
              opacity: 0.9; 
              font-size: 16px; 
              font-weight: 400; 
            }
            .content { 
              padding: 40px 30px; 
              background: white; 
            }
            .greeting { 
              font-size: 18px; 
              color: #2c3e50; 
              margin-bottom: 24px; 
              font-weight: 500; 
            }
            .main-text { 
              font-size: 16px; 
              line-height: 1.7; 
              color: #4a5568; 
              margin-bottom: 32px; 
            }
            .status-section { 
              background: ${config.bgColor}; 
              border: 2px solid ${config.borderColor}; 
              border-radius: 12px; 
              padding: 24px; 
              text-align: center; 
              margin: 32px 0; 
            }
            .status-icon { 
              width: 60px; 
              height: 60px; 
              background: ${config.color}; 
              color: white; 
              border-radius: 50%; 
              display: inline-flex; 
              align-items: center; 
              justify-content: center; 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 16px; 
            }
            .status-title { 
              font-size: 20px; 
              font-weight: 600; 
              color: ${config.color}; 
              margin-bottom: 8px; 
            }
            .status-description { 
              color: #4a5568; 
              font-size: 14px; 
              margin-bottom: 16px; 
            }
            .status-badge { 
              display: inline-block; 
              background: ${config.color}; 
              color: white; 
              padding: 8px 16px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: 600; 
              text-transform: uppercase; 
              letter-spacing: 0.5px; 
            }
            .info-section { 
              background: #f7fafc; 
              border: 1px solid #e2e8f0; 
              border-radius: 8px; 
              padding: 20px; 
              margin: 24px 0; 
            }
            .info-section .title { 
              color: #2d3748; 
              font-weight: 600; 
              margin-bottom: 12px; 
              font-size: 16px; 
            }
            .info-section .content { 
              color: #4a5568; 
              font-size: 15px; 
              line-height: 1.6; 
            }
            .next-steps { 
              background: #f0f9ff; 
              border: 1px solid #0ea5e9; 
              border-radius: 8px; 
              padding: 20px; 
              margin: 24px 0; 
            }
            .next-steps .title { 
              color: #0c4a6e; 
              font-weight: 600; 
              margin-bottom: 12px; 
              font-size: 16px; 
            }
            .next-steps .content { 
              color: #075985; 
              font-size: 15px; 
              line-height: 1.6; 
            }
            .footer { 
              background: #f8f9fa; 
              padding: 30px; 
              text-align: center; 
              border-top: 1px solid #e2e8f0; 
            }
            .footer-text { 
              color: #718096; 
              font-size: 14px; 
              margin: 0 0 12px 0; 
            }
            .footer-link { 
              color: #1e3c72; 
              text-decoration: none; 
              font-weight: 500; 
            }
            .footer-link:hover { 
              text-decoration: underline; 
            }
            .footer-copyright { 
              color: #a0aec0; 
              font-size: 12px; 
              margin-top: 16px; 
            }
            .congratulations { 
              background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); 
              border: 1px solid #10b981; 
              border-radius: 8px; 
              padding: 20px; 
              margin: 24px 0; 
              text-align: center; 
            }
            .congratulations .emoji { 
              font-size: 32px; 
              margin-bottom: 12px; 
            }
            .congratulations .text { 
              color: #047857; 
              font-size: 16px; 
              font-weight: 500; 
            }
            @media only screen and (max-width: 480px) {
              body { padding: 10px; }
              .header, .content, .footer { padding: 20px; }
              .status-icon { width: 50px; height: 50px; font-size: 20px; }
              .status-title { font-size: 18px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>NOTARIZED</h1>
              <p class="subtitle">Professional Notary Services Platform</p>
            </div>
            
            <div class="content">
              <div class="greeting">Dear ${notaryName},</div>
              
              <div class="main-text">
                We are writing to provide you with an important update regarding your notary application with Notarized Professional Services.
              </div>
              
              <div class="status-section">
                <div class="status-icon">${config.icon}</div>
                <div class="status-title">${config.title}</div>
                <div class="status-description">${config.description}</div>
                <div class="status-badge">${status}</div>
              </div>
              
              ${status === 'approved' ? `
                <div class="congratulations">
                  <div class="emoji">🎉</div>
                  <div class="text">Congratulations! You are now an authorized notary on our platform and may begin accepting client appointments.</div>
                </div>
              ` : ''}
              
              ${message ? `
                <div class="info-section">
                  <div class="title">Additional Information</div>
                  <div class="content">${message}</div>
                </div>
              ` : ''}
              
              ${nextSteps ? `
                <div class="next-steps">
                  <div class="title">Required Actions</div>
                  <div class="content">${nextSteps}</div>
                </div>
              ` : ''}
              
              <div class="main-text">
                ${status === 'approved' ? 
                  'You may now access your notary dashboard to manage your profile, set availability, and begin accepting client bookings through our secure platform.' : 
                  status === 'rejected' ? 
                  'We appreciate your interest in joining our platform. Please review any provided feedback and feel free to submit a revised application when you have addressed the noted requirements.' : 
                  'Our review team is carefully evaluating your application to ensure compliance with all regulatory requirements. We will notify you promptly once our assessment is complete.'
                }
              </div>
            </div>
            
            <div class="footer">
              <p class="footer-text">
                Questions about your application status? Our support team is here to assist.<br>
                Contact us at <a href="mailto:${supportEmail}" class="footer-link">${supportEmail}</a>
              </p>
              <div class="footer-copyright">
                © 2025 Notarized Professional Services. All rights reserved.<br>
                This is an automated message. Please do not reply to this email.
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      NOTARIZED - Professional Notary Services Platform
      Notary Application ${status === 'approved' ? 'Approved' : status === 'rejected' ? 'Status Update' : 'Under Review'}
      
      Dear ${notaryName},
      
      We are writing to provide you with an important update regarding your notary application with Notarized Professional Services.
      
      APPLICATION STATUS: ${status.toUpperCase()}
      
      ${config.description}
      
      ${status === 'approved' ? 
        '🎉 Congratulations! You are now an authorized notary on our platform and may begin accepting client appointments.' : ''
      }
      
      ${message ? `ADDITIONAL INFORMATION: ${message}` : ''}
      
      ${nextSteps ? `REQUIRED ACTIONS: ${nextSteps}` : ''}
      
      ${status === 'approved' ? 
        'You may now access your notary dashboard to manage your profile, set availability, and begin accepting client bookings through our secure platform.' : 
        status === 'rejected' ? 
        'We appreciate your interest in joining our platform. Please review any provided feedback and feel free to submit a revised application when you have addressed the noted requirements.' : 
        'Our review team is carefully evaluating your application to ensure compliance with all regulatory requirements. We will notify you promptly once our assessment is complete.'
      }
      
      Questions about your application status? Our support team is here to assist.
      Contact us at ${supportEmail}
      
      © 2025 Notarized Professional Services. All rights reserved.
      This is an automated message. Please do not reply to this email.
    `
  }
}
