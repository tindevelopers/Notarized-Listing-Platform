import { NotaryWithProfile } from "@/types/supabase";

export const mockNotaries: NotaryWithProfile[] = [
  // Los Angeles Area - Premium Real Estate
  {
    id: "mock-1",
    profile_id: "profile-1",
    business_name: "Johnson Legal Services",
    description:
      "Experienced notary public specializing in real estate transactions, loan signings, and legal document notarization. Available for mobile services throughout Los Angeles County.",
    phone: "(555) 123-4567",
    address: "123 Main Street, Suite 200",
    business_address: "123 Main Street, Suite 200",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90210",
    latitude: 34.0522,
    longitude: -118.2437,
    languages: ["English", "Spanish"],
    services: [
      "Real Estate",
      "Loan Signings",
      "Legal Documents",
      "Business Documents",
    ],
    specializations: ["Real Estate", "Loan Signings"],
    availability: "24/7 Available",
    availability_schedule: { 
      "monday": "9:00-21:00",
      "tuesday": "9:00-21:00", 
      "wednesday": "9:00-21:00",
      "thursday": "9:00-21:00",
      "friday": "9:00-21:00",
      "saturday": "10:00-18:00",
      "sunday": "12:00-17:00"
    },
    hourly_rate: 85.0,
    travel_radius: 50,
    is_mobile: true,
    is_online: true,
    is_verified: true,
    rating: 4.9,
    review_count: 127,
    commission_number: "CN-2024-001234",
    commission_expiry_date: "2026-12-31",
    notary_county: "Los Angeles",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 8,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-1",
      email: "sarah.johnson@notary.com",
      full_name: "Sarah Johnson",
      avatar_url:
        "https://i.pinimg.com/originals/77/71/68/7771683223d86b237a3304d6f32828b9.jpg",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // San Francisco - Business & Immigration
  {
    id: "mock-2",
    profile_id: "profile-2",
    business_name: "Chen Notary Services",
    description:
      "Professional mobile notary with over 10 years of experience. Specializing in business documents, immigration papers, and apostille services.",
    phone: "(555) 234-5678",
    address: "456 Business Ave",
    business_address: "456 Business Ave",
    city: "San Francisco",
    state: "CA",
    zip_code: "94102",
    latitude: 37.7749,
    longitude: -122.4194,
    languages: ["English", "Mandarin", "Cantonese"],
    services: [
      "Business Documents",
      "Immigration",
      "Apostille",
      "Wills & Trusts",
    ],
    specializations: ["Business Documents", "Immigration"],
    availability: "Business Hours",
    availability_schedule: { 
      "monday": "8:00-17:00",
      "tuesday": "8:00-17:00", 
      "wednesday": "8:00-17:00",
      "thursday": "8:00-17:00",
      "friday": "8:00-17:00",
      "saturday": "closed",
      "sunday": "closed"
    },
    hourly_rate: 90.0,
    travel_radius: 30,
    is_mobile: true,
    is_online: true,
    is_verified: true,
    rating: 5.0,
    review_count: 203,
    commission_number: "CN-2024-002345",
    commission_expiry_date: "2027-06-30",
    notary_county: "San Francisco",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 12,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-2",
      email: "michael.chen@notary.com",
      full_name: "Michael Chen",
      avatar_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // San Diego - Emergency Services
  {
    id: "mock-3",
    profile_id: "profile-3",
    business_name: "Davis Mobile Notary",
    description:
      "Reliable and efficient mobile notary service available 24/7. Specializing in urgent document signings and real estate closings.",
    phone: "(555) 345-6789",
    address: "789 Oak Street",
    business_address: "789 Oak Street",
    city: "San Diego",
    state: "CA",
    zip_code: "92101",
    latitude: 32.7157,
    longitude: -117.1611,
    languages: ["English"],
    services: [
      "Real Estate",
      "Emergency Services",
      "Medical Documents",
      "Power of Attorney",
    ],
    specializations: ["Emergency Services", "Real Estate"],
    availability: "24/7 Available",
    availability_schedule: null,
    hourly_rate: 80.0,
    travel_radius: 40,
    is_mobile: true,
    is_online: false,
    is_verified: true,
    rating: 4.8,
    review_count: 156,
    commission_number: "CN-2024-003456",
    commission_expiry_date: "2025-09-15",
    notary_county: "San Diego",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 7,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-3",
      email: "emily.davis@notary.com",
      full_name: "Emily Davis",
      avatar_url:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // Sacramento - Corporate/Legal
  {
    id: "mock-4",
    profile_id: "profile-4",
    business_name: "Wilson Professional Notary",
    description:
      "Certified notary public offering comprehensive notarization services. Expert in corporate documents and complex legal paperwork.",
    phone: "(555) 456-7890",
    address: "321 Corporate Blvd",
    business_address: "321 Corporate Blvd",
    city: "Sacramento",
    state: "CA",
    zip_code: "95814",
    latitude: 38.5816,
    longitude: -121.4944,
    languages: ["English", "Spanish"],
    services: ["Corporate Documents", "Legal Documents", "Affidavits", "Contracts"],
    specializations: ["Corporate Documents", "Legal Documents"],
    availability: "Business Hours",
    availability_schedule: { 
      "monday": "9:00-17:00",
      "tuesday": "9:00-17:00", 
      "wednesday": "9:00-17:00",
      "thursday": "9:00-17:00",
      "friday": "9:00-17:00",
      "saturday": "closed",
      "sunday": "closed"
    },
    hourly_rate: 75.0,
    travel_radius: 35,
    is_mobile: false,
    is_online: true,
    is_verified: true,
    rating: 4.9,
    review_count: 189,
    commission_number: "CN-2024-004567",
    commission_expiry_date: "2026-03-20",
    notary_county: "Sacramento",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 15,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-4",
      email: "david.wilson@notary.com",
      full_name: "David Wilson",
      avatar_url:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // Fresno - Immigration & Family Law
  {
    id: "mock-5",
    profile_id: "profile-5",
    business_name: "Rodriguez Bilingual Notary",
    description:
      "Bilingual notary services in English and Spanish. Specializing in immigration documents, family law papers, and personal documents.",
    phone: "(555) 567-8901",
    address: "654 Community Street",
    business_address: "654 Community Street",
    city: "Fresno",
    state: "CA",
    zip_code: "93701",
    latitude: 36.7378,
    longitude: -119.7871,
    languages: ["English", "Spanish"],
    services: [
      "Immigration",
      "Family Law",
      "Personal Documents",
      "School Documents",
    ],
    specializations: ["Immigration", "Family Law"],
    availability: "Evenings",
    availability_schedule: { 
      "monday": "17:00-21:00",
      "tuesday": "17:00-21:00", 
      "wednesday": "17:00-21:00",
      "thursday": "17:00-21:00",
      "friday": "17:00-21:00",
      "saturday": "9:00-17:00",
      "sunday": "9:00-15:00"
    },
    hourly_rate: 70.0,
    travel_radius: 25,
    is_mobile: true,
    is_online: true,
    is_verified: true,
    rating: 5.0,
    review_count: 234,
    commission_number: "CN-2024-005678",
    commission_expiry_date: "2027-01-10",
    notary_county: "Fresno",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 9,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-5",
      email: "lisa.rodriguez@notary.com",
      full_name: "Lisa Rodriguez",
      avatar_url:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // Orange County - Express Services
  {
    id: "mock-6",
    profile_id: "profile-6",
    business_name: "Taylor Express Notary",
    description:
      "Fast and reliable notary services with same-day appointments available. Serving the greater Orange County area.",
    phone: "(555) 678-9012",
    address: "987 Express Lane",
    business_address: "987 Express Lane",
    city: "Anaheim",
    state: "CA",
    zip_code: "92801",
    latitude: 33.8366,
    longitude: -117.9143,
    languages: ["English"],
    services: [
      "Real Estate",
      "Loan Modifications",
      "Refinancing",
      "Express Services",
    ],
    specializations: ["Real Estate", "Loan Modifications"],
    availability: "Weekends",
    availability_schedule: { 
      "monday": "closed",
      "tuesday": "closed", 
      "wednesday": "closed",
      "thursday": "closed",
      "friday": "18:00-21:00",
      "saturday": "8:00-20:00",
      "sunday": "8:00-20:00"
    },
    hourly_rate: 95.0,
    travel_radius: 45,
    is_mobile: true,
    is_online: true,
    is_verified: true,
    rating: 4.7,
    review_count: 145,
    commission_number: "CN-2024-006789",
    commission_expiry_date: "2026-08-30",
    notary_county: "Orange",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 6,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-6",
      email: "james.taylor@notary.com",
      full_name: "James Taylor",
      avatar_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // Oakland - Online Specialist
  {
    id: "mock-7",
    profile_id: "profile-7",
    business_name: "Martinez Digital Notary",
    description:
      "California's premier online notarization service. RON certified with advanced digital security. Available for remote signings 24/7.",
    phone: "(555) 789-0123",
    address: "555 Tech Plaza",
    business_address: "555 Tech Plaza",
    city: "Oakland",
    state: "CA",
    zip_code: "94612",
    latitude: 37.8044,
    longitude: -122.2712,
    languages: ["English", "Spanish", "Portuguese"],
    services: [
      "Online Notarization",
      "Digital Documents",
      "Remote Signing",
      "Tech Startups",
    ],
    specializations: ["Online Notarization", "Digital Documents"],
    availability: "24/7 Available",
    availability_schedule: null,
    hourly_rate: 100.0,
    travel_radius: 0,
    is_mobile: false,
    is_online: true,
    is_verified: true,
    rating: 4.95,
    review_count: 89,
    commission_number: "CN-2024-007890",
    commission_expiry_date: "2027-04-15",
    notary_county: "Alameda",
    notary_type: "remote",
    verification_status: "verified",
    years_experience: 4,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-7",
      email: "carlos.martinez@notary.com",
      full_name: "Carlos Martinez",
      avatar_url:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // Riverside - Healthcare & Medical
  {
    id: "mock-8",
    profile_id: "profile-8",
    business_name: "Thompson Medical Notary",
    description:
      "Specialized notary services for healthcare institutions, medical practices, and patient documents. HIPAA compliant and mobile.",
    phone: "(555) 890-1234",
    address: "432 Health Center Dr",
    business_address: "432 Health Center Dr",
    city: "Riverside",
    state: "CA",
    zip_code: "92501",
    latitude: 33.9533,
    longitude: -117.3962,
    languages: ["English"],
    services: [
      "Medical Documents",
      "Healthcare Forms",
      "HIPAA Compliance",
      "Patient Advocacy",
    ],
    specializations: ["Medical Documents", "Healthcare Forms"],
    availability: "Business Hours",
    availability_schedule: { 
      "monday": "7:00-19:00",
      "tuesday": "7:00-19:00", 
      "wednesday": "7:00-19:00",
      "thursday": "7:00-19:00",
      "friday": "7:00-19:00",
      "saturday": "8:00-16:00",
      "sunday": "closed"
    },
    hourly_rate: 65.0,
    travel_radius: 30,
    is_mobile: true,
    is_online: false,
    is_verified: true,
    rating: 4.85,
    review_count: 178,
    commission_number: "CN-2024-008901",
    commission_expiry_date: "2026-11-22",
    notary_county: "Riverside",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 11,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-8",
      email: "rebecca.thompson@notary.com",
      full_name: "Rebecca Thompson",
      avatar_url:
        "https://i.pinimg.com/736x/83/22/39/832239d0dd351a9f6b9e56de9131c325.jpg",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // Bakersfield - Agricultural/Rural
  {
    id: "mock-9",
    profile_id: "profile-9",
    business_name: "Williams Rural Notary",
    description:
      "Serving agricultural communities and rural areas throughout Kern County. Specializing in farm documents, land transfers, and estate planning.",
    phone: "(555) 901-2345",
    address: "876 Country Road",
    business_address: "876 Country Road",
    city: "Bakersfield",
    state: "CA",
    zip_code: "93301",
    latitude: 35.3733,
    longitude: -119.0187,
    languages: ["English", "Spanish"],
    services: [
      "Agricultural Documents",
      "Land Transfers",
      "Estate Planning", 
      "Rural Services",
    ],
    specializations: ["Agricultural Documents", "Estate Planning"],
    availability: "Weekends",
    availability_schedule: { 
      "monday": "closed",
      "tuesday": "closed", 
      "wednesday": "closed",
      "thursday": "closed",
      "friday": "closed",
      "saturday": "6:00-18:00",
      "sunday": "8:00-16:00"
    },
    hourly_rate: 60.0,
    travel_radius: 75,
    is_mobile: true,
    is_online: false,
    is_verified: true,
    rating: 4.6,
    review_count: 92,
    commission_number: "CN-2024-009012",
    commission_expiry_date: "2025-08-30",
    notary_county: "Kern",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 13,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-9",
      email: "john.williams@notary.com",
      full_name: "John Williams",
      avatar_url:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // Modesto - Affordable Services
  {
    id: "mock-10",
    profile_id: "profile-10",
    business_name: "Garcia Affordable Notary",
    description:
      "Budget-friendly notary services without compromising quality. Serving Central Valley families and small businesses with care.",
    phone: "(555) 012-3456",
    address: "123 Budget Lane",
    business_address: "123 Budget Lane",
    city: "Modesto",
    state: "CA",
    zip_code: "95354",
    latitude: 37.6391,
    longitude: -120.9969,
    languages: ["English", "Spanish"],
    services: [
      "Personal Documents",
      "Small Business",
      "Family Services",
      "Budget Notary",
    ],
    specializations: ["Personal Documents", "Small Business"],
    availability: "Evenings",
    availability_schedule: { 
      "monday": "18:00-21:00",
      "tuesday": "18:00-21:00", 
      "wednesday": "18:00-21:00",
      "thursday": "18:00-21:00",
      "friday": "18:00-21:00",
      "saturday": "10:00-16:00",
      "sunday": "12:00-17:00"
    },
    hourly_rate: 45.0,
    travel_radius: 20,
    is_mobile: true,
    is_online: true,
    is_verified: true,
    rating: 4.7,
    review_count: 267,
    commission_number: "CN-2024-010123",
    commission_expiry_date: "2026-12-15",
    notary_county: "Stanislaus",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 5,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-10",
      email: "maria.garcia@notary.com",
      full_name: "Maria Garcia",
      avatar_url:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // Long Beach - Port/Maritime
  {
    id: "mock-11",
    profile_id: "profile-11",
    business_name: "Harbor Notary Services",
    description:
      "Maritime and shipping document specialist. Available at ports, customs offices, and shipping facilities throughout Long Beach area.",
    phone: "(555) 123-4567",
    address: "789 Harbor Blvd",
    business_address: "789 Harbor Blvd",
    city: "Long Beach",
    state: "CA",
    zip_code: "90802",
    latitude: 33.7701,
    longitude: -118.1937,
    languages: ["English", "Spanish", "Korean"],
    services: [
      "Maritime Documents",
      "Shipping Papers",
      "Customs Forms",
      "International Trade",
    ],
    specializations: ["Maritime Documents", "International Trade"],
    availability: "Business Hours",
    availability_schedule: { 
      "monday": "5:00-17:00",
      "tuesday": "5:00-17:00", 
      "wednesday": "5:00-17:00",
      "thursday": "5:00-17:00",
      "friday": "5:00-17:00",
      "saturday": "6:00-14:00",
      "sunday": "closed"
    },
    hourly_rate: 110.0,
    travel_radius: 25,
    is_mobile: true,
    is_online: false,
    is_verified: true,
    rating: 4.8,
    review_count: 134,
    commission_number: "CN-2024-011234",
    commission_expiry_date: "2027-03-10",
    notary_county: "Los Angeles",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 16,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-11",
      email: "steven.kim@notary.com",
      full_name: "Steven Kim",
      avatar_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  // Santa Barbara - Luxury/High-End
  {
    id: "mock-12",
    profile_id: "profile-12",
    business_name: "Elite Notary Concierge",
    description:
      "Premium notary services for luxury properties, high-value transactions, and discerning clientele. White-glove service with complete discretion.",
    phone: "(555) 234-5678",
    address: "456 Luxury Row",
    business_address: "456 Luxury Row", 
    city: "Santa Barbara",
    state: "CA",
    zip_code: "93101",
    latitude: 34.4208,
    longitude: -119.6982,
    languages: ["English", "French"],
    services: [
      "Luxury Real Estate",
      "High-Value Transactions",
      "Concierge Services",
      "Private Clients",
    ],
    specializations: ["Luxury Real Estate", "High-Value Transactions"],
    availability: "24/7 Available",
    availability_schedule: null,
    hourly_rate: 150.0,
    travel_radius: 60,
    is_mobile: true,
    is_online: true,
    is_verified: true,
    rating: 5.0,
    review_count: 78,
    commission_number: "CN-2024-012345",
    commission_expiry_date: "2027-05-20",
    notary_county: "Santa Barbara",
    notary_type: "traditional",
    verification_status: "verified",
    years_experience: 18,
    profile_completed: true,
    seal_image_url: null,
    signature_image_url: null,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: {
      id: "profile-12",
      email: "alexandra.beaumont@notary.com",
      full_name: "Alexandra Beaumont",
      avatar_url:
        "https://images.pexels.com/photos/6383206/pexels-photo-6383206.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
];

export const mockReviews = [
  {
    id: "review-1",
    notary_id: "mock-1",
    reviewer_id: "reviewer-1",
    rating: 5,
    comment:
      "Excellent service! Sarah was very professional and made the process smooth and easy.",
    service_date: "2024-01-15",
    created_at: "2024-01-16T00:00:00Z",
    updated_at: "2024-01-16T00:00:00Z",
    profiles: {
      id: "reviewer-1",
      email: "reviewer1@example.com",
      full_name: "John Smith",
      avatar_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "review-2",
    notary_id: "mock-1",
    reviewer_id: "reviewer-2",
    rating: 5,
    comment:
      "Very knowledgeable and efficient. Highly recommend for real estate transactions.",
    service_date: "2024-01-20",
    created_at: "2024-01-21T00:00:00Z",
    updated_at: "2024-01-21T00:00:00Z",
    profiles: {
      id: "reviewer-2",
      email: "reviewer2@example.com",
      full_name: "Jane Doe",
      avatar_url:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
];

export function getMockNotariesResponse(params: any = {}) {
  let filteredNotaries = [...mockNotaries];

  // Search by name or specialty (q parameter)
  if (params.q && params.q.trim()) {
    const searchTerm = params.q.toLowerCase().trim();
    filteredNotaries = filteredNotaries.filter((n) =>
      n.profiles?.full_name?.toLowerCase()?.includes(searchTerm) ||
      n.business_name?.toLowerCase()?.includes(searchTerm) ||
      n.description?.toLowerCase()?.includes(searchTerm) ||
      n.services?.some(service => service?.toLowerCase()?.includes(searchTerm)) ||
      n.specializations?.some(spec => spec?.toLowerCase()?.includes(searchTerm))
    );
  }

  // City filter
  if (params.city && params.city !== 'all') {
    const citySearchTerm = params.city.toLowerCase().replace('-', ' ');
    filteredNotaries = filteredNotaries.filter((n) =>
      n.city?.toLowerCase()?.includes(citySearchTerm)
    );
  }

  // Service type filter
  if (params.service && params.service !== 'all') {
    const serviceMap = {
      'real-estate': 'Real Estate',
      'business': 'Business Documents', 
      'legal': 'Legal Documents',
      'healthcare': 'Medical Documents',
      'online': 'Online Notarization',
      'immigration': 'Immigration',
      'family-law': 'Family Law'
    };
    const mappedService = serviceMap[params.service as keyof typeof serviceMap] || params.service;
    filteredNotaries = filteredNotaries.filter((n) =>
      n.services?.some(service => 
        service?.toLowerCase()?.includes(mappedService?.toLowerCase())
      )
    );
  }

  // Price range filter
  if (params.priceRange && params.priceRange !== 'all') {
    filteredNotaries = filteredNotaries.filter((n) => {
      const rate = n.hourly_rate || 0;
      switch (params.priceRange) {
        case '0-50': return rate >= 0 && rate <= 50;
        case '50-75': return rate > 50 && rate <= 75;
        case '75-100': return rate > 75 && rate <= 100;
        case '100+': return rate > 100;
        default: return true;
      }
    });
  }

  // Service options filters
  if (params.isOnline === true || params.isOnline === 'true') {
    filteredNotaries = filteredNotaries.filter((n) => n.is_online === true);
  }
  
  if (params.isMobile === true || params.isMobile === 'true') {
    filteredNotaries = filteredNotaries.filter((n) => n.is_mobile === true);
  }

  // Availability filter
  if (params.availability && params.availability !== 'all') {
    filteredNotaries = filteredNotaries.filter((n) => {
      const availability = (n.availability as string)?.toLowerCase();
      switch (params.availability) {
        case '24-7': return availability?.includes('24/7');
        case 'business-hours': return availability?.includes('business hours');
        case 'evenings': return availability?.includes('evenings');
        case 'weekends': return availability?.includes('weekends');
        default: return true;
      }
    });
  }

  // State filter
  if (params.state) {
    filteredNotaries = filteredNotaries.filter((n) =>
      n.state?.toLowerCase() === params.state?.toLowerCase()
    );
  }

  // ZIP code filter
  if (params.zip) {
    filteredNotaries = filteredNotaries.filter((n) => n.zip_code === params.zip);
  }

  // Sort results (default by rating, then review count)
  filteredNotaries.sort((a, b) => {
    const ratingDiff = (b.rating || 0) - (a.rating || 0);
    if (ratingDiff !== 0) return ratingDiff;
    return (b.review_count || 0) - (a.review_count || 0);
  });

  const limit = params.limit || 20;
  const offset = params.offset || 0;

  return {
    notaries: filteredNotaries.slice(offset, offset + limit),
    total: filteredNotaries.length,
    limit,
    offset,
  };
}

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

export function getMockNotaryWithReviews(identifier: string) {
  // Try to find by ID first
  let notary = mockNotaries.find((n) => n.id === identifier);

  // If not found by ID, try with "mock-" prefix for numeric IDs
  if (!notary && /^\d+$/.test(identifier)) {
    notary = mockNotaries.find((n) => n.id === `mock-${identifier}`);
  }

  // If not found by ID, try to find by slug (generated from full_name)
  if (!notary) {
    notary = mockNotaries.find((n) => {
      const slug = generateSlug(n.profiles?.full_name || "");
      return slug === identifier;
    });
  }

  if (!notary) return null;

  const reviews = mockReviews.filter((r) => r.notary_id === notary.id);

  return {
    notary: {
      ...notary,
      reviews,
    },
  };
}
