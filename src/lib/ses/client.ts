

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
  return !!(
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.AWS_SES_FROM_EMAIL
  )
}
