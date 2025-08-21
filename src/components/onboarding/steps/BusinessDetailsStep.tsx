
"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Building2, MapPin, Phone, Clock } from 'lucide-react'

interface BusinessDetailsData {
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

interface BusinessDetailsStepProps {
  data: BusinessDetailsData
  updateData: (data: BusinessDetailsData) => void
}

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

const timeOptions = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
]

export function BusinessDetailsStep({ data, updateData }: BusinessDetailsStepProps) {
  const handleInputChange = (field: keyof BusinessDetailsData, value: string) => {
    updateData({
      ...data,
      [field]: value
    })
  }

  const handleHoursChange = (day: keyof BusinessDetailsData['businessHours'], field: 'open' | 'close' | 'closed', value: string | boolean) => {
    updateData({
      ...data,
      businessHours: {
        ...data.businessHours,
        [day]: {
          ...data.businessHours[day],
          [field]: value
        }
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>Business Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="Your Notary Business Name"
              value={data.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                id="phone"
                placeholder="(555) 123-4567"
                value={data.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="pl-10 mt-1"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Business Address</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              value={data.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                value={data.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Select 
                value={data.state} 
                onValueChange={(value) => handleInputChange('state', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                placeholder="12345"
                value={data.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="mt-1"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Business Hours</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {days.map((day) => (
            <div key={day} className="flex items-center justify-between space-x-4">
              <div className="w-24 font-medium capitalize">
                {day}
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={!data.businessHours[day].closed}
                  onCheckedChange={(checked) => handleHoursChange(day, 'closed', !checked)}
                />
                
                {!data.businessHours[day].closed ? (
                  <div className="flex items-center space-x-2">
                    <Select
                      value={data.businessHours[day].open}
                      onValueChange={(value) => handleHoursChange(day, 'open', value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <span className="text-muted-foreground">to</span>
                    
                    <Select
                      value={data.businessHours[day].close}
                      onValueChange={(value) => handleHoursChange(day, 'close', value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <span className="text-muted-foreground ml-4">Closed</span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
