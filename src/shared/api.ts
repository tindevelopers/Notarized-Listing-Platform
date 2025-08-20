/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

import { NotaryWithProfile, ReviewWithProfile, BookingWithDetails } from "@/types/supabase";

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * API Response Types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface NotariesResponse {
  notaries: NotaryWithProfile[];
  total: number;
  limit: number;
  offset: number;
}

export interface NotaryDetailsResponse {
  notary: NotaryWithProfile & {
    reviews: ReviewWithProfile[];
  };
}

export interface SearchNotariesResponse {
  notaries: NotaryWithProfile[];
  total: number;
  query: {
    q?: string;
    state?: string;
    city?: string;
    zipCode?: string;
    service?: string;
    radius?: number;
    limit?: number;
  };
}

export interface BookingsResponse {
  bookings: BookingWithDetails[];
}

export interface ProfileResponse {
  profile: any;
  user: any;
}

/**
 * Search Parameters
 */
export interface NotarySearchParams {
  city?: string;
  state?: string;
  service?: string;
  limit?: number;
  offset?: number;
}

export interface AdvancedSearchParams {
  q?: string;
  state?: string;
  city?: string;
  zip?: string;
  service?: string;
  radius?: number;
  limit?: number;
}

/**
 * Booking Data
 */
export interface CreateBookingData {
  notary_id: string;
  service_type: string;
  service_date: string;
  service_time: string;
  location?: string;
  notes?: string;
  total_cost?: number;
}

/**
 * Profile Update Data
 */
export interface UpdateProfileData {
  full_name?: string;
  avatar_url?: string;
}

/**
 * Common service types
 */
export const SERVICE_TYPES = [
  "Real Estate",
  "Business Documents",
  "Legal Documents",
  "Loan Signings",
  "Wills & Trusts",
  "Power of Attorney",
  "Immigration",
  "Affidavits",
  "Contracts",
  "Mobile Notary",
  "Online Notarization",
  "Apostille",
  "Medical Documents",
  "School Forms",
  "Travel Documents",
] as const;

export type ServiceType = typeof SERVICE_TYPES[number];

/**
 * US States
 */
export const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
] as const;

/**
 * Booking status types
 */
export const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;
export type BookingStatus = typeof BOOKING_STATUSES[number];

/**
 * Helper functions
 */
export function getStateNameByCode(code: string): string {
  const state = US_STATES.find(s => s.code === code.toUpperCase());
  return state?.name || code;
}

export function getStateCodeByName(name: string): string {
  const state = US_STATES.find(s => s.name.toLowerCase() === name.toLowerCase());
  return state?.code || name;
}
