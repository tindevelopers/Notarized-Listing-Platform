
"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, FileText, Award, Plus, X, Upload, Star } from 'lucide-react'

interface ProfileSetupData {
  profilePhoto: string
  bio: string
  yearsExperience: number
  specializations: string[]
  certifications: string[]
}

interface ProfileSetupStepProps {
  data: ProfileSetupData
  updateData: (data: ProfileSetupData) => void
}

const commonSpecializations = [
  'Real Estate Closings',
  'Loan Signings',
  'Legal Documents',
  'Medical Forms',
  'Business Documents',
  'Immigration Papers',
  'Estate Planning',
  'Power of Attorney',
  'Apostille Services',
  'Mobile Notary',
  'Remote Online Notarization'
]

const commonCertifications = [
  'Certified Signing Agent',
  'NNA Certified',
  'LSS (Loan Signing System)',
  'Notary2Pro Certified',
  'Background Screened',
  'E&O Insured',
  'Fidelity Approved',
  'Pavaso Certified',
  'RON Certified',
  'Bilingual Services'
]

export function ProfileSetupStep({ data, updateData }: ProfileSetupStepProps) {
  const [newSpecialization, setNewSpecialization] = useState('')
  const [newCertification, setNewCertification] = useState('')
  const [photoUploading, setPhotoUploading] = useState(false)

  const handleInputChange = (field: keyof ProfileSetupData, value: string | number) => {
    updateData({
      ...data,
      [field]: value
    })
  }

  const handleArrayAdd = (field: 'specializations' | 'certifications', value: string) => {
    if (value && !data[field].includes(value)) {
      updateData({
        ...data,
        [field]: [...data[field], value]
      })
    }
  }

  const handleArrayRemove = (field: 'specializations' | 'certifications', value: string) => {
    updateData({
      ...data,
      [field]: data[field].filter(item => item !== value)
    })
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPhotoUploading(true)
    try {
      // Create a FormData object
      const formData = new FormData()
      formData.append('file', file)

      // Upload the file
      const response = await fetch('/api/upload/profile-photo', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const { url } = await response.json()
        handleInputChange('profilePhoto', url)
      } else {
        console.error('Failed to upload photo')
      }
    } catch (error) {
      console.error('Error uploading photo:', error)
    } finally {
      setPhotoUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Photo and Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Professional Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={data.profilePhoto} alt="Profile" />
              <AvatarFallback className="text-2xl">
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col items-center space-y-2">
              <Label htmlFor="photo-upload" className="cursor-pointer">
                <div className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                  {photoUploading ? (
                    <>
                      <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload Photo</span>
                    </>
                  )}
                </div>
              </Label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: Square image, min 300x300px
              </p>
            </div>
          </div>

          {/* Years of Experience */}
          <div>
            <Label htmlFor="experience">Years of Experience as a Notary</Label>
            <div className="relative">
              <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="5"
                value={data.yearsExperience || ''}
                onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value) || 0)}
                className="pl-10 mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Professional Bio</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Tell potential clients about your experience and what makes you unique
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="I am a certified notary public with [X] years of experience serving the [City/Region] area. I specialize in [your specializations] and pride myself on providing professional, reliable, and convenient notary services. My commitment to accuracy and client satisfaction has earned me [achievements/recognition]..."
            value={data.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            className="min-h-32"
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              {data.bio.length}/1000 characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Specializations */}
      <Card>
        <CardHeader>
          <CardTitle>Specializations</CardTitle>
          <p className="text-sm text-muted-foreground">
            Areas where you have particular expertise or focus
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.specializations.map((spec) => (
              <Badge key={spec} variant="secondary" className="flex items-center gap-1">
                {spec}
                <button
                  onClick={() => handleArrayRemove('specializations', spec)}
                  className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add a specialization..."
              value={newSpecialization}
              onChange={(e) => setNewSpecialization(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleArrayAdd('specializations', newSpecialization)
                  setNewSpecialization('')
                }
              }}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => {
                handleArrayAdd('specializations', newSpecialization)
                setNewSpecialization('')
              }}
              disabled={!newSpecialization || data.specializations.includes(newSpecialization)}
              size="sm"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Common Specializations:</p>
            <div className="flex flex-wrap gap-2">
              {commonSpecializations.filter(spec => !data.specializations.includes(spec)).map((spec) => (
                <Button
                  key={spec}
                  variant="outline"
                  size="sm"
                  onClick={() => handleArrayAdd('specializations', spec)}
                  className="text-xs"
                >
                  {spec}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Certifications & Credentials</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Professional certifications, training, and credentials that build client trust
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.certifications.map((cert) => (
              <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                {cert}
                <button
                  onClick={() => handleArrayRemove('certifications', cert)}
                  className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add a certification..."
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleArrayAdd('certifications', newCertification)
                  setNewCertification('')
                }
              }}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => {
                handleArrayAdd('certifications', newCertification)
                setNewCertification('')
              }}
              disabled={!newCertification || data.certifications.includes(newCertification)}
              size="sm"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Common Certifications:</p>
            <div className="flex flex-wrap gap-2">
              {commonCertifications.filter(cert => !data.certifications.includes(cert)).map((cert) => (
                <Button
                  key={cert}
                  variant="outline"
                  size="sm"
                  onClick={() => handleArrayAdd('certifications', cert)}
                  className="text-xs"
                >
                  {cert}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
