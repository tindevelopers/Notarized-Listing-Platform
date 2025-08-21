
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/auth/AuthModal'
import { ProfileDropdown } from '@/components/auth/ProfileDropdown'

export default function AuthButtons() {
  const { user, loading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [defaultTab, setDefaultTab] = useState<'signin' | 'signup'>('signin')

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
      </div>
    )
  }

  if (user) {
    return <ProfileDropdown />
  }

  const handleSignInClick = () => {
    setDefaultTab('signin')
    setAuthModalOpen(true)
  }

  const handleSignUpClick = () => {
    setDefaultTab('signup')
    setAuthModalOpen(true)
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={handleSignInClick}>
          Sign In
        </Button>
        <Button size="sm" onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </div>
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        defaultTab={defaultTab}
      />
    </>
  )
}
