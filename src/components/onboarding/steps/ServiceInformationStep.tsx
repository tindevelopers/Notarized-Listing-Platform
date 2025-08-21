
"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DollarSign, CheckCircle, Languages, Plus, X } from 'lucide-react'
import { useState } from 'react'

interface ServiceInformationData {
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

interface ServiceInformationStepProps {
  data: ServiceInformationData
  updateData: (data: ServiceInformationData) => void
}

const availableServices = [
  'Acknowledgments',
  'Jurats',
  'Oaths and Affirmations',
  'Copy Certifications',
  'Signature Witnessing',
  'Document Preparation',
  'Real Estate Signings',
  'Loan Signings',
  'Power of Attorney',
  'Wills and Estates'
]

const commonLanguages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Chinese (Mandarin)', 'Chinese (Cantonese)', 'Japanese', 'Korean',
  'Arabic', 'Russian', 'Hindi', 'Vietnamese', 'Tagalog'
]

export function ServiceInformationStep({ data, updateData }: ServiceInformationStepProps) {
  const [newLanguage, setNewLanguage] = useState('')

  const handleServiceToggle = (service: string) => {
    const updatedServices = data.services.includes(service)
      ? data.services.filter(s => s !== service)
      : [...data.services, service]
    
    updateData({
      ...data,
      services: updatedServices
    })
  }

  const handlePricingChange = (field: keyof ServiceInformationData['pricing'], value: number) => {
    updateData({
      ...data,
      pricing: {
        ...data.pricing,
        [field]: value
      }
    })
  }

  const handleAvailabilityChange = (field: keyof ServiceInformationData['availability'], value: boolean) => {
    updateData({
      ...data,
      availability: {
        ...data.availability,
        [field]: value
      }
    })
  }

  const handleLanguageAdd = (language: string) => {
    if (language && !data.languages.includes(language)) {
      updateData({
        ...data,
        languages: [...data.languages, language]
      })
    }
    setNewLanguage('')
  }

  const handleLanguageRemove = (language: string) => {
    updateData({
      ...data,
      languages: data.languages.filter(l => l !== language)
    })
  }

  return (
    <div className="space-y-6">
      {/* Services Offered */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Services Offered</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Select all notarial services you provide
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableServices.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  checked={data.services.includes(service)}
                  onCheckedChange={() => handleServiceToggle(service)}
                />
                <Label 
                  htmlFor={service}
                  className="text-sm font-normal cursor-pointer"
                >
                  {service}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Pricing Structure</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Set your fees for common notarial acts (in USD)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="acknowledgment">Acknowledgment</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="acknowledgment"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="15.00"
                  value={data.pricing.acknowledgment}
                  onChange={(e) => handlePricingChange('acknowledgment', parseFloat(e.target.value) || 0)}
                  className="pl-10 mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="jurat">Jurat</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="jurat"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="15.00"
                  value={data.pricing.jurat}
                  onChange={(e) => handlePricingChange('jurat', parseFloat(e.target.value) || 0)}
                  className="pl-10 mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="oath">Oath/Affirmation</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="oath"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="15.00"
                  value={data.pricing.oath}
                  onChange={(e) => handlePricingChange('oath', parseFloat(e.target.value) || 0)}
                  className="pl-10 mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="copynotarization">Copy Certification</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="copynotarization"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="15.00"
                  value={data.pricing.copynotarization}
                  onChange={(e) => handlePricingChange('copynotarization', parseFloat(e.target.value) || 0)}
                  className="pl-10 mt-1"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="travelFee">Travel Fee (per mile)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="travelFee"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="25.00"
                  value={data.pricing.travelFee}
                  onChange={(e) => handlePricingChange('travelFee', parseFloat(e.target.value) || 0)}
                  className="pl-10 mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Service Availability</CardTitle>
          <p className="text-sm text-muted-foreground">
            How do you provide your notary services?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Mobile Notary</Label>
                <p className="text-sm text-muted-foreground">Travel to client locations</p>
              </div>
              <Switch
                checked={data.availability.mobile}
                onCheckedChange={(checked) => handleAvailabilityChange('mobile', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Remote Online Notarization (RON)</Label>
                <p className="text-sm text-muted-foreground">Video-based notarization</p>
              </div>
              <Switch
                checked={data.availability.remote}
                onCheckedChange={(checked) => handleAvailabilityChange('remote', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>In-Office Service</Label>
                <p className="text-sm text-muted-foreground">Clients visit your location</p>
              </div>
              <Switch
                checked={data.availability.inOffice}
                onCheckedChange={(checked) => handleAvailabilityChange('inOffice', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Emergency Services</Label>
                <p className="text-sm text-muted-foreground">After-hours availability</p>
              </div>
              <Switch
                checked={data.availability.emergency}
                onCheckedChange={(checked) => handleAvailabilityChange('emergency', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Languages className="w-5 h-5" />
            <span>Languages Spoken</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Languages you can provide notary services in
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.languages.map((language) => (
              <Badge key={language} variant="secondary" className="flex items-center gap-1">
                {language}
                {language !== 'English' && (
                  <button
                    onClick={() => handleLanguageRemove(language)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add a language..."
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLanguageAdd(newLanguage)}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => handleLanguageAdd(newLanguage)}
              disabled={!newLanguage || data.languages.includes(newLanguage)}
              size="sm"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Quick Add:</p>
            <div className="flex flex-wrap gap-2">
              {commonLanguages.filter(lang => !data.languages.includes(lang)).map((language) => (
                <Button
                  key={language}
                  variant="outline"
                  size="sm"
                  onClick={() => handleLanguageAdd(language)}
                  className="text-xs"
                >
                  {language}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
