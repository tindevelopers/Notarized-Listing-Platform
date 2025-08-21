"use client"

import { useQuery } from "@tanstack/react-query";
import { NotaryWithProfile } from "@/types/supabase";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { getMockNotariesResponse, getMockNotaryWithReviews } from "@/lib/mock-data";

interface NotariesResponse {
  notaries: NotaryWithProfile[]
  total: number
  limit: number
  offset: number
}

interface SearchParams {
  city?: string
  state?: string
  service?: string
  limit?: number
  offset?: number
}

export function useNotaries(params: SearchParams = {}) {
  return useQuery<NotariesResponse>({
    queryKey: ["notaries", params],
    queryFn: async ({ signal }) => {
      // Use mock data if Supabase is not configured
      if (!isSupabaseConfigured) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return getMockNotariesResponse(params);
      }

      const searchParams = new URLSearchParams();
      
      if (params.city) searchParams.set("city", params.city);
      if (params.state) searchParams.set("state", params.state);
      if (params.service) searchParams.set("service", params.service);
      if (params.limit) searchParams.set("limit", params.limit.toString());
      if (params.offset) searchParams.set("offset", params.offset.toString());

      try {
        const response = await fetch(`/api/notaries?${searchParams}`, { signal });

        if (!response.ok) {
          throw new Error("Failed to fetch notaries");
        }

        return response.json();
      } catch (error: any) {
        // Ignore AbortError as it's expected when requests are cancelled
        if (error?.name === 'AbortError') {
          return { notaries: [], total: 0, limit: 0, offset: 0 };
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useNotary(id: string) {
  return useQuery<{ notary: NotaryWithProfile & { reviews: any[] } }>({
    queryKey: ["notary", id],
    queryFn: async ({ signal }) => {
      // Use mock data if Supabase is not configured
      if (!isSupabaseConfigured) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        const result = getMockNotaryWithReviews(id);
        if (!result) {
          throw new Error("Notary not found");
        }
        return result;
      }

      try {
        const response = await fetch(`/api/notaries/${id}`, { signal });

        if (!response.ok) {
          throw new Error("Failed to fetch notary");
        }

        return response.json();
      } catch (error: any) {
        // Ignore AbortError as it's expected when requests are cancelled
        if (error?.name === 'AbortError') {
          return null;
        }
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

interface SearchNotariesParams {
  q?: string
  state?: string
  city?: string
  zip?: string
  service?: string
  radius?: number
  limit?: number
}

export function useSearchNotaries(params: SearchNotariesParams) {
  return useQuery<{
    notaries: NotaryWithProfile[]
    total: number
    query: SearchNotariesParams
  }>({
    queryKey: ["search-notaries", params],
    queryFn: async ({ signal }) => {
      // Use mock data if Supabase is not configured
      if (!isSupabaseConfigured) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 400));
        const mockResponse = getMockNotariesResponse(params);
        return {
          notaries: mockResponse.notaries,
          total: mockResponse.total,
          query: params,
        };
      }

      const searchParams = new URLSearchParams();
      
      if (params.q) searchParams.set("q", params.q);
      if (params.state) searchParams.set("state", params.state);
      if (params.city) searchParams.set("city", params.city);
      if (params.zip) searchParams.set("zip", params.zip);
      if (params.service) searchParams.set("service", params.service);
      if (params.radius) searchParams.set("radius", params.radius.toString());
      if (params.limit) searchParams.set("limit", params.limit.toString());

      try {
        const response = await fetch(`/api/notaries/search?${searchParams}`, { signal });

        if (!response.ok) {
          throw new Error("Failed to search notaries");
        }

        return response.json();
      } catch (error: any) {
        // Ignore AbortError as it's expected when requests are cancelled
        if (error?.name === 'AbortError') {
          return { notaries: [], total: 0, query: params };
        }
        throw error;
      }
    },
    enabled: !!(params.q || params.state || params.city || params.zip),
    staleTime: 2 * 60 * 1000, // 2 minutes for searches
  });
}
