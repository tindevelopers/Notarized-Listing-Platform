
"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'

interface EmailVerificationPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  onVerificationSuccess: () => void
  developmentMode?: boolean
  developmentCode?: string
}

export function EmailVerificationPopup({ 
  open, 
  onOpenChange, 
  email, 
  onVerificationSuccess,
  developmentMode = false,
  developmentCode = ''
}: EmailVerificationPopupProps) {
  const [activeMethod, setActiveMethod] = useState<'code' | 'email'>('code')
  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [emailCheckLoading, setEmailCheckLoading] = useState(false)
  const [emailConfirmed, setEmailConfirmed] = useState(false)

  // Auto-check for email confirmation every 3 seconds when in email method
  useEffect(() => {
    if (activeMethod !== 'email' || !open) return

    const checkEmailConfirmation = async () => {
      setEmailCheckLoading(true)
      try {
        const response = await fetch(`/api/auth/check-verification?email=${encodeURIComponent(email)}`)
        if (response.ok) {
          const data = await response.json()
          if (data.isVerified) {
            setEmailConfirmed(true)
            setSuccess('Email confirmed successfully!')
            setTimeout(() => {
              onVerificationSuccess()
            }, 1500)
          }
        }
      } catch (error) {
        console.error('Error checking email confirmation:', error)
      } finally {
        setEmailCheckLoading(false)
      }
    }

    // Check immediately, then every 3 seconds
    checkEmailConfirmation()
    const interval = setInterval(checkEmailConfirmation, 3000)

    return () => clearInterval(interval)
  }, [activeMethod, open, email, onVerificationSuccess])

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit verification code')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Email verified successfully!')
        setTimeout(() => {
          onVerificationSuccess()
        }, 1500)
      } else {
        setError(data.error || 'Verification failed')
      }
    } catch (error) {
      setError('An error occurred during verification. Please try again.')
    }
    
    setLoading(false)
  }

  const handleResendCode = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const { generateVerificationCode } = await import('@/lib/auth/client-verification')
      const newCode = generateVerificationCode()
      
      const response = await fetch('/api/email/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userName: email.split('@')[0],
          verificationCode: newCode,
        }),
      })

      if (response.ok) {
        setSuccess('New verification code sent! Please check your email.')
        setError(null)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to resend verification code')
      }
    } catch (error) {
      setError('An error occurred while resending the code. Please try again.')
    }
    
    setLoading(false)
  }

  const resetForm = () => {
    setVerificationCode('')
    setError(null)
    setSuccess(null)
    setEmailConfirmed(false)
    setActiveMethod('code')
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm()
      onOpenChange(newOpen)
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Verify Your Email
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              We've sent a verification email to<br />
              <strong>{email}</strong>
            </p>
          </div>

          {/* Method Selection */}
          <div className="flex rounded-lg bg-muted p-1">
            <Button
              type="button"
              variant={activeMethod === 'code' ? 'default' : 'ghost'}
              className="flex-1 text-sm"
              onClick={() => setActiveMethod('code')}
              disabled={loading || emailCheckLoading}
            >
              Enter Code
            </Button>
            <Button
              type="button"
              variant={activeMethod === 'email' ? 'default' : 'ghost'}
              className="flex-1 text-sm"
              onClick={() => setActiveMethod('email')}
              disabled={loading || emailCheckLoading}
            >
              Check Email
            </Button>
          </div>

          {/* Code Entry Method */}
          {activeMethod === 'code' && (
            <div className="space-y-4">
              {/* Development Mode: Show the verification code directly */}
              {developmentMode && developmentCode && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Development Mode</span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1 mb-3">
                    AWS SES not configured. Your verification code is:
                  </p>
                  <div className="bg-white border rounded-lg p-3">
                    <div className="text-2xl font-mono font-bold text-center tracking-wider text-blue-600">
                      {developmentCode}
                    </div>
                  </div>
                  <p className="text-xs text-yellow-700 mt-2">
                    Enter this code in the form below to complete verification.
                  </p>
                </div>
              )}

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verification-code">Enter 6-digit code</Label>
                  <Input
                    id="verification-code"
                    type="text"
                    placeholder="000000"
                    className="text-center text-xl tracking-widest font-mono"
                    value={verificationCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                      setVerificationCode(value)
                    }}
                    maxLength={6}
                    disabled={loading}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify Code
                </Button>
              </form>

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={handleResendCode}
                  disabled={loading}
                >
                  Resend Code
                </Button>
              </div>
            </div>
          )}

          {/* Email Confirmation Method */}
          {activeMethod === 'email' && (
            <div className="space-y-4 text-center">
              <div className="flex flex-col items-center space-y-4 py-6">
                {emailConfirmed ? (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                  <>
                    {emailCheckLoading ? (
                      <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
                    ) : (
                      <Mail className="h-16 w-16 text-blue-500" />
                    )}
                  </>
                )}
                
                <div>
                  {emailConfirmed ? (
                    <p className="text-lg font-semibold text-green-700">Email Confirmed!</p>
                  ) : (
                    <>
                      <p className="text-lg font-semibold">Check your email</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Click the confirmation link in the email we sent you
                      </p>
                    </>
                  )}
                </div>
              </div>

              {!emailConfirmed && (
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <RefreshCw className={`h-4 w-4 ${emailCheckLoading ? 'animate-spin' : ''}`} />
                  <span>Checking for confirmation...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
