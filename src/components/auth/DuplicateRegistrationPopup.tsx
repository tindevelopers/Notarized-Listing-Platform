
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Mail, RotateCcw } from 'lucide-react'

interface DuplicateRegistrationPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  onTryAgain: () => void
  onResetPassword: () => void
}

export function DuplicateRegistrationPopup({
  open,
  onOpenChange,
  email,
  onTryAgain,
  onResetPassword
}: DuplicateRegistrationPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Account Already Exists
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              An account with the email <strong>{email}</strong> already exists in our system.
            </AlertDescription>
          </Alert>

          <div className="text-sm text-gray-600 text-center">
            You can either try registering with a different email address or reset the password for your existing account.
          </div>

          <div className="space-y-3">
            <Button 
              onClick={onTryAgain}
              className="w-full"
              variant="outline"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again with Different Email
            </Button>

            <Button 
              onClick={onResetPassword}
              className="w-full"
            >
              <Mail className="mr-2 h-4 w-4" />
              Reset Password for This Account
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            If you believe this is an error, please contact our support team.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
