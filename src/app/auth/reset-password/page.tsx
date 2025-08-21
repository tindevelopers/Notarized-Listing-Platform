

"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, Lock, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

function ResetPasswordContent() {
  const [step, setStep] = useState<'request' | 'reset' | 'success'>('request')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn } = useAuth()
  
  const token = searchParams?.get('token')
  const emailFromUrl = searchParams?.get('email')

  useEffect(() => {
    if (token && emailFromUrl) {
      setStep('reset')
      setEmail(emailFromUrl)
    } else if (emailFromUrl) {
      // Pre-fill email from URL parameter (e.g., from duplicate registration popup)
      setEmail(emailFromUrl)
    }
  }, [token, emailFromUrl])

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    if (!email) {
      setError('Please enter your email address')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/email/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message)
        setEmail('')
      } else {
        setError(data.error || 'Failed to send reset email')
      }
    } catch (error) {
      console.error('Password reset request error:', error)
      setError('An error occurred while processing your request')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    if (!password || !confirmPassword) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token, 
          email, 
          newPassword: password 
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStep('success')
        setSuccess('Your password has been updated successfully!')
        
        // Auto-login the user with new password after a brief delay
        setTimeout(async () => {
          const { error: signInError } = await signIn(email, password)
          if (!signInError) {
            router.push('/')
          }
        }, 2000)
      } else {
        setError(data.error || 'Failed to update password')
      }
    } catch (error) {
      console.error('Password update error:', error)
      setError('An error occurred while updating your password')
    } finally {
      setLoading(false)
    }
  }

  const renderRequestForm = () => (
    <Card>
      <CardHeader className="text-center">
        <Lock className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRequestReset} className="space-y-4">
          {error && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="text-sm"
            >
              Back to Home
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  const renderResetForm = () => (
    <Card>
      <CardHeader className="text-center">
        <Lock className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleResetPassword} className="space-y-4">
          {error && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Password...
              </>
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )

  const renderSuccess = () => (
    <Card>
      <CardHeader className="text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <CardTitle className="text-2xl font-bold">Password Updated!</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            {success || 'Your password has been updated successfully!'}
          </AlertDescription>
        </Alert>
        
        <p className="text-sm text-gray-600">
          You will be automatically signed in and redirected to the homepage.
        </p>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {step === 'request' && renderRequestForm()}
        {step === 'reset' && renderResetForm()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading...</span>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}
