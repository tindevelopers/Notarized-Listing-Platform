
"use client"

import React from 'react'
import { AlertCircle, CheckCircle, X, ExternalLink, Info } from 'lucide-react'
import { Alert, AlertDescription } from '../ui/alert'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { isSupabaseConfigured, getSupabaseConfigInstructions, env } from '@/lib/supabase/config'

export function SupabaseNotice() {
  const [isVisible, setIsVisible] = React.useState(true)
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  const instructions = getSupabaseConfigInstructions()
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isProduction = process.env.NODE_ENV === 'production'

  // Show in development always, in production only if not configured
  const shouldShow = isDevelopment || (isProduction && !isSupabaseConfigured)

  if (!shouldShow || !isVisible) {
    return null
  }

  return (
    <Alert className={`mb-4 ${isSupabaseConfigured ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {isSupabaseConfigured ? (
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
          ) : (
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
          )}
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                Supabase {isSupabaseConfigured ? 'Connected' : 'Configuration'}
              </span>
              <Badge variant={isSupabaseConfigured ? "secondary" : "destructive"} className="text-xs">
                {isSupabaseConfigured ? 'Active' : 'Required'}
              </Badge>
              {isProduction && !isSupabaseConfigured && (
                <Badge variant="outline" className="text-xs">
                  Production
                </Badge>
              )}
            </div>
            
            <AlertDescription className={`text-xs ${isSupabaseConfigured ? 'text-green-800' : 'text-amber-800'}`}>
              {isSupabaseConfigured ? (
                <div>
                  ✅ Configuration is active and working properly
                  {isDevelopment && (
                    <div className="mt-1 font-mono text-xs text-green-600">
                      URL: {env.supabaseUrl?.substring(0, 40)}...
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="font-medium">⚠️ {instructions.issue}</div>
                  <div className="mt-1">{instructions.solution}</div>
                  {isProduction && (
                    <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-red-800">
                      <strong>Production Alert:</strong> This error will prevent authentication and data access. 
                      Configure environment variables in your deployment platform.
                    </div>
                  )}
                </div>
              )}
            </AlertDescription>

            {!isSupabaseConfigured && (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <Info className="h-3 w-3 mr-1" />
                  {isExpanded ? 'Hide' : 'Show'} Setup Guide
                </Button>

                {isExpanded && (
                  <div className="space-y-2 text-xs">
                    <div className="bg-white p-2 rounded border">
                      <div className="font-medium mb-1">Required Environment Variables:</div>
                      <div className="font-mono text-xs space-y-1">
                        <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</div>
                        <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Get these values from your</span>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Supabase Dashboard
                      </Button>
                    </div>
                    <div className="text-gray-600 space-y-1">
                      <div>1. Go to Supabase Dashboard → Your Project</div>
                      <div>2. Navigate to Settings → API</div>
                      <div>3. Copy "Project URL" and "anon public" key</div>
                      <div>4. Add them to your .env.local file or deployment platform</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 flex-shrink-0"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </Alert>
  )
}
