
"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Lock, User, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { EmailVerificationPopup } from './EmailVerificationPopup'
import { OnboardingWizard } from '../onboarding/OnboardingWizard'
import { DuplicateRegistrationPopup } from './DuplicateRegistrationPopup'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTab?: 'signin' | 'signup'
}

export function AuthModal({ open, onOpenChange, defaultTab = 'signin' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showVerification, setShowVerification] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showDuplicateRegistration, setShowDuplicateRegistration] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState('')
  const [duplicateEmail, setDuplicateEmail] = useState('')
  const [developmentMode, setDevelopmentMode] = useState(false)
  const [developmentCode, setDevelopmentCode] = useState('')

  // Form states
  const [signInData, setSignInData] = useState({ email: '', password: '' })
  const [signUpData, setSignUpData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '', 
    fullName: '' 
  })

  const { signIn, signUp } = useAuth()

  const resetForms = () => {
    setSignInData({ email: '', password: '' })
    setSignUpData({ email: '', password: '', confirmPassword: '', fullName: '' })
    setError(null)
    setSuccess(null)
    setShowVerification(false)
    setShowOnboarding(false)
    setShowDuplicateRegistration(false)
    setVerificationEmail('')
    setDuplicateEmail('')
    setDevelopmentMode(false)
    setDevelopmentCode('')
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    if (!signInData.email || !signInData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    const { error } = await signIn(signInData.email, signInData.password)
    
    if (error) {
      setError(error.message || 'An error occurred during sign in')
    } else {
      resetForms()
      onOpenChange(false)
    }
    
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    if (!signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    const { error, requiresVerification, developmentMode, verificationCode, isDuplicate } = await signUp(signUpData.email, signUpData.password, signUpData.fullName)
    
    console.log('Sign up result:', { error, requiresVerification, developmentMode, verificationCode, isDuplicate })
    
    if (error && isDuplicate) {
      // Handle duplicate registration
      console.log('Showing duplicate registration popup for:', signUpData.email)
      setDuplicateEmail(signUpData.email)
      setShowDuplicateRegistration(true)
      setSignUpData({ email: '', password: '', confirmPassword: '', fullName: '' })
    } else if (error) {
      setError(error.message || 'An error occurred during sign up')
    } else {
      // Always require verification for the new flow
      console.log('Showing verification popup for:', signUpData.email)
      setVerificationEmail(signUpData.email)
      setShowVerification(true)
      
      // If in development mode, store the verification code to display
      if (developmentMode && verificationCode) {
        setDevelopmentMode(true)
        setDevelopmentCode(verificationCode)
      }
      
      setSignUpData({ email: '', password: '', confirmPassword: '', fullName: '' })
    }
    
    setLoading(false)
  }

  const handleVerificationSuccess = () => {
    setShowVerification(false)
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setSuccess('Welcome! Your profile has been created successfully.')
    // The user will be automatically signed in via the verification process
    resetForms()
    onOpenChange(false)
  }

  const handleDuplicateTryAgain = () => {
    setShowDuplicateRegistration(false)
    setDuplicateEmail('')
    setActiveTab('signup')
    // The signup form will be cleared but the user can enter a new email
  }

  const handleDuplicateResetPassword = () => {
    setShowDuplicateRegistration(false)
    onOpenChange(false)
    // Navigate to reset password page with the email pre-filled
    const resetUrl = `/auth/reset-password?email=${encodeURIComponent(duplicateEmail)}`
    window.location.href = resetUrl
  }

  return (
    <>
      {/* Main Auth Modal */}
      <Dialog open={open && !showVerification && !showOnboarding && !showDuplicateRegistration} onOpenChange={(newOpen) => {
        if (!newOpen) resetForms()
        onOpenChange(newOpen)
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Welcome to Notarized
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
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={(value) => {
            setActiveTab(value as 'signin' | 'signup')
            setError(null)
            setSuccess(null)
          }}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      onOpenChange(false)
                      window.location.href = '/auth/reset-password'
                    }}
                  >
                    Forgot your password?
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Enter your password (min 6 characters)"
                      className="pl-10"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Email Verification Popup */}
      <EmailVerificationPopup
        open={showVerification}
        onOpenChange={setShowVerification}
        email={verificationEmail}
        onVerificationSuccess={handleVerificationSuccess}
        developmentMode={developmentMode}
        developmentCode={developmentCode}
      />

      {/* Onboarding Wizard */}
      <OnboardingWizard
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onComplete={handleOnboardingComplete}
        userEmail={verificationEmail}
      />

      {/* Duplicate Registration Popup */}
      <DuplicateRegistrationPopup
        open={showDuplicateRegistration}
        onOpenChange={setShowDuplicateRegistration}
        email={duplicateEmail}
        onTryAgain={handleDuplicateTryAgain}
        onResetPassword={handleDuplicateResetPassword}
      />
    </>
  )
}
