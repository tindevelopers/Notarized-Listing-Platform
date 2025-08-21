"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

export function useProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async ({ signal }) => {
      try {
        const response = await fetch("/api/auth/profile", { signal });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
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
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (data: { full_name?: string; avatar_url?: string }) => {
      try {
        const response = await fetch("/api/auth/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        return response.json();
      } catch (error: any) {
        // Ignore AbortError as it's expected when requests are cancelled
        if (error?.name === 'AbortError') {
          return;
        }
        throw error;
      }
    },
      
    onSuccess: () => {
      // Invalidate profile query to refetch latest data
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });
}

export function useBookings() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: async ({ signal }) => {
      try {
        const response = await fetch("/api/bookings", { signal });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        return response.json();
      } catch (error: any) {
        // Ignore AbortError as it's expected when requests are cancelled
        if (error?.name === 'AbortError') {
          return [];
        }
        throw error;
      }
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (data: {
      notary_id: string
      service_type: string
      service_date: string
      service_time: string
      location?: string
      notes?: string
      total_cost?: number
    }) => {
      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to create booking");
        }

        return response.json();
      } catch (error: any) {
        // Ignore AbortError as it's expected when requests are cancelled
        if (error?.name === 'AbortError') {
          return;
        }
        throw error;
      }
    },
      
    onSuccess: () => {
      // Invalidate bookings query to refetch latest data
      queryClient.invalidateQueries({ queryKey: ["bookings", user?.id] });
    },
  });
}
