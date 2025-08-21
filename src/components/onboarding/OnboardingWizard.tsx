
"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Building2, Settings as Service, User, ArrowLeft, ArrowRight } from 'lucide-react'

import { BusinessDetailsStep } from './steps/BusinessDetailsStep'
import { ServiceInformationStep } from './steps/ServiceInformationStep'
import { ProfileSetupStep } from './steps/ProfileSetupStep'

interface OnboardingWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: () => void
  userEmail: string
}

export interface OnboardingData {
  businessDetails: {
    businessName: string
    address: string
    city: string
    state: string
    zipCode: string
    phone: string
    businessHours: {
      monday: { open: string; close: string; closed: boolean }
      tuesday: { open: string; close: string; closed: boolean }
      wednesday: { open: string; close: string; closed: boolean }
      thursday: { open: string; close: string; closed: boolean }
      friday: { open: string; close: string; closed: boolean }
      saturday: { open: string; close: string; closed: boolean }
      sunday: { open: string; close: string; closed: boolean }
    }
  }
  serviceInformation: {
    services: string[]
    pricing: {
      acknowledgment: number
      jurat: number
      oath: number
      copynotarization: number
      travelFee: number
    }
    availability: {
      mobile: boolean
      remote: boolean
      inOffice: boolean
      emergency: boolean
    }
    languages: string[]
  }
  profileSetup: {
    profilePhoto: string
    bio: string
    yearsExperience: number
    specializations: string[]
    certifications: string[]
  }
}

const initialData: OnboardingData = {
  businessDetails: {
    businessName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    businessHours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '09:00', close: '14:00', closed: false },
      sunday: { open: '09:00', close: '14:00', closed: true }
    }
  },
  serviceInformation: {
    services: [],
    pricing: {
      acknowledgment: 15,
      jurat: 15,
      oath: 15,
      copynotarization: 15,
      travelFee: 25
    },
    availability: {
      mobile: false,
      remote: false,
      inOffice: true,
      emergency: false
    },
    languages: ['English']
  },
  profileSetup: {
    profilePhoto: '',
    bio: '',
    yearsExperience: 0,
    specializations: [],
    certifications: []
  }
}

const steps = [
  {
    id: 'business',
    title: 'Business Details',
    description: 'Basic information about your notary business',
    icon: Building2
  },
  {
    id: 'services',
    title: 'Service Information', 
    description: 'Services offered, pricing, and availability',
    icon: Service
  },
  {
    id: 'profile',
    title: 'Profile Setup',
    description: 'Professional profile and experience',
    icon: User
  }
]

export function OnboardingWizard({ open, onOpenChange, onComplete, userEmail }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>(initialData)
  const [loading, setLoading] = useState(false)

  const updateData = (stepKey: keyof OnboardingData, stepData: any) => {
    setData(prev => ({
      ...prev,
      [stepKey]: stepData
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      // Save onboarding data via API
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          onboardingData: data
        }),
      })

      if (response.ok) {
        onComplete()
      } else {
        console.error('Failed to save onboarding data')
      }
    } catch (error) {
      console.error('Error completing onboarding:', error)
    } finally {
      setLoading(false)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BusinessDetailsStep
            data={data.businessDetails}
            updateData={(stepData) => updateData('businessDetails', stepData)}
          />
        )
      case 1:
        return (
          <ServiceInformationStep
            data={data.serviceInformation}
            updateData={(stepData) => updateData('serviceInformation', stepData)}
          />
        )
      case 2:
        return (
          <ProfileSetupStep
            data={data.profileSetup}
            updateData={(stepData) => updateData('profileSetup', stepData)}
          />
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Complete Your Notary Profile
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Help clients find you by completing your business information
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step Navigation */}
          <div className="grid grid-cols-3 gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep
              
              return (
                <Card key={step.id} className={`relative cursor-pointer transition-colors ${
                  isActive ? 'border-primary bg-primary/5' : 
                  isCompleted ? 'border-green-200 bg-green-50' : 
                  'border-muted'
                }`}>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500 text-white' :
                        isActive ? 'bg-primary text-primary-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          isActive ? 'text-primary' :
                          isCompleted ? 'text-green-700' :
                          'text-muted-foreground'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {(() => {
                  const StepIcon = steps[currentStep].icon
                  return <StepIcon className="w-5 h-5" />
                })()}
                <span>{steps[currentStep].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleComplete}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Completing...
                  </>
                ) : (
                  <>
                    Complete Profile
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNext}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
