
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Mail, 
  User, 
  Key 
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const profileFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
})

const passwordResetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PasswordResetValues = z.infer<typeof passwordResetSchema>

interface ProfileFormProps {
  initialData: {
    email: string
    full_name: string
    avatar_url: string | null
  }
  userId: string
}

export function ProfileForm({ initialData, userId }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Parse full name into first and last name
  const nameParts = initialData?.full_name?.split(' ') || []
  const firstName = nameParts?.[0] || ''
  const lastName = nameParts?.slice(1)?.join(' ') || ''

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName,
      lastName,
      email: initialData?.email || '',
    },
  })

  const passwordForm = useForm<PasswordResetValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: initialData?.email || '',
    },
  })

  const onProfileSubmit = async (values: ProfileFormValues) => {
    try {
      setIsSubmitting(true)
      setUpdateSuccess(false)

      const response = await fetch('/api/profile/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          userId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }

      setUpdateSuccess(true)
      toast({
        title: 'Profile updated successfully',
        description: 'Your profile information has been saved.',
      })

      // Refresh the page to show updated data
      router.refresh()
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error updating profile',
        description: error?.message || 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onPasswordReset = async (values: PasswordResetValues) => {
    try {
      setIsResettingPassword(true)
      setResetEmailSent(false)

      const response = await fetch('/api/email/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send password reset email')
      }

      setResetEmailSent(true)
      toast({
        title: 'Password reset email sent',
        description: 'Check your email for instructions to reset your password.',
      })
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error sending password reset',
        description: error?.message || 'Something went wrong. Please try again.',
      })
    } finally {
      setIsResettingPassword(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Information Form */}
      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
          {updateSuccess && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Your profile has been updated successfully.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={profileForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your first name" 
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={profileForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your last name" 
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={profileForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="Enter your email address" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Profile...
              </>
            ) : (
              'Update Profile'
            )}
          </Button>
        </form>
      </Form>

      <Separator />

      {/* Password Reset Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password Reset
          </CardTitle>
          <CardDescription>
            Send a password reset link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordReset)} className="space-y-4">
              {resetEmailSent && (
                <Alert className="border-blue-200 bg-blue-50">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Password reset instructions have been sent to your email address.
                  </AlertDescription>
                </Alert>
              )}

              <FormField
                control={passwordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Enter your email address" 
                        {...field} 
                        disabled={isResettingPassword}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                variant="outline"
                disabled={isResettingPassword}
                className="w-full sm:w-auto"
              >
                {isResettingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Reset Email...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Password Reset Email
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
