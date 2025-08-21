/**
 * Robust fetch wrapper with comprehensive error handling
 * Handles network issues, timeout, retries, and third-party interference
 */

export interface FetchWrapperOptions extends RequestInit {
  timeout?: number
  retries?: number
  retryDelay?: number
  fallbackToNavigation?: boolean
  suppressErrors?: boolean
}

const defaultOptions: FetchWrapperOptions = {
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
  fallbackToNavigation: false,
  suppressErrors: false,
}

interface FetchError extends Error {
  status?: number
  statusText?: string
  url?: string
  isTimeout?: boolean
  isNetworkError?: boolean
  isThirdPartyInterference?: boolean
}

class RobustFetchError extends Error implements FetchError {
  status?: number
  statusText?: string
  url?: string
  isTimeout?: boolean
  isNetworkError?: boolean
  isThirdPartyInterference?: boolean

  constructor(
    message: string,
    options: {
      status?: number
      statusText?: string
      url?: string
      isTimeout?: boolean
      isNetworkError?: boolean
      isThirdPartyInterference?: boolean
    } = {}
  ) {
    super(message)
    this.name = 'RobustFetchError'
    Object.assign(this, options)
  }
}

// Detect if error is from third-party interference
const isThirdPartyInterference = (error: any): boolean => {
  const errorMessage = error?.message || ''
  const errorStack = error?.stack || ''
  
  return (
    errorStack.includes('chrome-extension://') ||
    errorStack.includes('fullstory.com') ||
    errorStack.includes('frame_ant.js') ||
    errorMessage.includes('Extension context') ||
    errorMessage.includes('Script error')
  )
}

// Create timeout promise
const createTimeoutPromise = (timeoutMs: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new RobustFetchError('Request timeout', { isTimeout: true }))
    }, timeoutMs)
  })
}

// Sleep utility for retry delays
const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Enhanced fetch with retry logic
const fetchWithRetry = async (
  url: string | URL | Request,
  options: FetchWrapperOptions,
  attempt: number = 1
): Promise<Response> => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), options.timeout!)

    const fetchPromise = fetch(url, {
      ...options,
      signal: controller.signal,
    })

    const response = await Promise.race([
      fetchPromise,
      createTimeoutPromise(options.timeout!)
    ])

    clearTimeout(timeoutId)
    return response
  } catch (error: any) {
    // Determine error type
    let robustError: RobustFetchError

    if (error.name === 'AbortError') {
      robustError = new RobustFetchError('Request was aborted', { isTimeout: true })
    } else if (isThirdPartyInterference(error)) {
      robustError = new RobustFetchError('Third-party script interference', { 
        isThirdPartyInterference: true 
      })
    } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      robustError = new RobustFetchError('Network error', { isNetworkError: true })
    } else {
      robustError = new RobustFetchError(error.message || 'Unknown fetch error')
    }

    robustError.url = typeof url === 'string' ? url : url.toString()

    // Retry logic
    if (attempt < options.retries! && (robustError.isNetworkError || robustError.isTimeout)) {
      if (!options.suppressErrors) {
        console.warn(`🔄 Fetch attempt ${attempt} failed, retrying in ${options.retryDelay}ms:`, robustError.message)
      }
      await sleep(options.retryDelay!)
      return fetchWithRetry(url, options, attempt + 1)
    }

    throw robustError
  }
}

/**
 * Robust fetch wrapper that handles common development issues
 */
export const robustFetch = async (
  input: string | URL | Request,
  options: FetchWrapperOptions = {}
): Promise<Response> => {
  const config = { ...defaultOptions, ...options }

  try {
    const response = await fetchWithRetry(input, config)
    
    if (!response.ok) {
      throw new RobustFetchError(
        `HTTP ${response.status}: ${response.statusText}`,
        {
          status: response.status,
          statusText: response.statusText,
          url: typeof input === 'string' ? input : input.toString()
        }
      )
    }

    return response
  } catch (error: any) {
    if (error instanceof RobustFetchError) {
      // Handle specific error types
      if (error.isThirdPartyInterference && config.suppressErrors) {
        console.debug('🔇 Suppressed third-party fetch interference:', error.message)
        throw error // Still throw but it's logged appropriately
      }

      if (error.isNetworkError && config.fallbackToNavigation) {
        console.warn('🔄 Network error detected, falling back to browser navigation')
        if (typeof window !== 'undefined' && typeof input === 'string') {
          window.location.href = input
          return new Response('Fallback navigation initiated')
        }
      }

      if (!config.suppressErrors) {
        console.error('🚨 Robust fetch error:', {
          message: error.message,
          url: error.url,
          status: error.status,
          isTimeout: error.isTimeout,
          isNetworkError: error.isNetworkError,
          isThirdPartyInterference: error.isThirdPartyInterference
        })
      }
    }

    throw error
  }
}

/**
 * JSON fetch wrapper with automatic parsing
 */
export const robustFetchJson = async <T = any>(
  input: string | URL | Request,
  options: FetchWrapperOptions = {}
): Promise<T> => {
  const response = await robustFetch(input, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  try {
    return await response.json()
  } catch (parseError) {
    throw new RobustFetchError('Failed to parse JSON response', {
      url: typeof input === 'string' ? input : input.toString()
    })
  }
}

/**
 * Global fetch polyfill for development
 */
export const installGlobalFetchWrapper = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return
  }

  const originalFetch = window.fetch

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      return await robustFetch(input as string, {
        ...init,
        suppressErrors: true, // Don't double-log errors
      })
    } catch (error: any) {
      // For third-party interference, use original fetch as fallback
      if (error.isThirdPartyInterference) {
        try {
          return await originalFetch(input, init)
        } catch (fallbackError) {
          console.debug('🔇 Both robust and original fetch failed due to third-party interference')
          throw error
        }
      }
      throw error
    }
  }

  console.log('🛡️ Global fetch wrapper installed for development')
}

// Auto-install in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  installGlobalFetchWrapper()
}
