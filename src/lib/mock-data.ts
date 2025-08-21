import { NotaryWithProfile } from "@/types/supabase";

export const mockNotaries: NotaryWithProfile[] = [
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
    availability: null,
    availability_schedule: null,
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
    availability: null,
    availability_schedule: null,
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
    availability: null,
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
    services: ["Corporate Documents", "Legal Forms", "Affidavits", "Contracts"],
    specializations: ["Corporate Documents", "Legal Forms"],
    availability: null,
    availability_schedule: null,
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
      "School Forms",
    ],
    specializations: ["Immigration", "Family Law"],
    availability: null,
    availability_schedule: null,
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
      "Quick Services",
    ],
    specializations: ["Real Estate", "Loan Modifications"],
    availability: null,
    availability_schedule: null,
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

  // Apply basic filtering
  if (params.city) {
    filteredNotaries = filteredNotaries.filter((n) =>
      n.city.toLowerCase().includes(params.city.toLowerCase()),
    );
  }

  if (params.service) {
    filteredNotaries = filteredNotaries.filter((n) =>
      n.services?.includes(params.service),
    );
  }

  const limit = params.limit || 10;
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
