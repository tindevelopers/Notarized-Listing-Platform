

import { SESClient } from '@aws-sdk/client-ses'

// Create SES client configuration
export const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

// SES configuration
export const SES_CONFIG = {
  fromEmail: process.env.AWS_SES_FROM_EMAIL || 'noreply@yourdomain.com',
  fromName: process.env.AWS_SES_FROM_NAME || 'Notarized Platform',
  region: process.env.AWS_REGION || 'us-east-1',
}

// Check if SES is properly configured
export const isSESConfigured = () => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  const fromEmail = process.env.AWS_SES_FROM_EMAIL
  
  // Check if credentials exist and are not placeholder values
  return !!(
    accessKeyId &&
    secretAccessKey &&
    fromEmail &&
    !accessKeyId.includes('your-aws-access-key-id') &&
    !secretAccessKey.includes('your-aws-secret-access-key') &&
    !fromEmail.includes('yourdomain.com') &&
    accessKeyId.length > 10 && // Real AWS keys are much longer
    secretAccessKey.length > 20 // Real AWS secrets are much longer
  )
}
