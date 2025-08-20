
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notaries: {
        Row: {
          id: string
          profile_id: string
          business_name: string | null
          description: string | null
          phone: string | null
          address: string | null
          city: string
          state: string
          zip_code: string | null
          latitude: number | null
          longitude: number | null
          languages: string[] | null
          services: string[] | null
          availability: Json | null
          hourly_rate: number | null
          travel_radius: number | null
          is_mobile: boolean
          is_online: boolean
          is_verified: boolean
          rating: number | null
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          business_name?: string | null
          description?: string | null
          phone?: string | null
          address?: string | null
          city: string
          state: string
          zip_code?: string | null
          latitude?: number | null
          longitude?: number | null
          languages?: string[] | null
          services?: string[] | null
          availability?: Json | null
          hourly_rate?: number | null
          travel_radius?: number | null
          is_mobile?: boolean
          is_online?: boolean
          is_verified?: boolean
          rating?: number | null
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          business_name?: string | null
          description?: string | null
          phone?: string | null
          address?: string | null
          city?: string
          state?: string
          zip_code?: string | null
          latitude?: number | null
          longitude?: number | null
          languages?: string[] | null
          services?: string[] | null
          availability?: Json | null
          hourly_rate?: number | null
          travel_radius?: number | null
          is_mobile?: boolean
          is_online?: boolean
          is_verified?: boolean
          rating?: number | null
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notaries_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          notary_id: string
          reviewer_id: string
          rating: number
          comment: string | null
          service_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          notary_id: string
          reviewer_id: string
          rating: number
          comment?: string | null
          service_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          notary_id?: string
          reviewer_id?: string
          rating?: number
          comment?: string | null
          service_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_notary_id_fkey"
            columns: ["notary_id"]
            referencedRelation: "notaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      bookings: {
        Row: {
          id: string
          notary_id: string
          client_id: string
          service_type: string
          service_date: string
          service_time: string
          location: string | null
          notes: string | null
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_cost: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          notary_id: string
          client_id: string
          service_type: string
          service_date: string
          service_time: string
          location?: string | null
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_cost?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          notary_id?: string
          client_id?: string
          service_type?: string
          service_date?: string
          service_time?: string
          location?: string | null
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          total_cost?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_notary_id_fkey"
            columns: ["notary_id"]
            referencedRelation: "notaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

// Helper types for the application
export type NotaryWithProfile = Database["public"]["Tables"]["notaries"]["Row"] & {
  profiles: Database["public"]["Tables"]["profiles"]["Row"]
}

export type ReviewWithProfile = Database["public"]["Tables"]["reviews"]["Row"] & {
  profiles: Database["public"]["Tables"]["profiles"]["Row"]
}

export type BookingWithDetails = Database["public"]["Tables"]["bookings"]["Row"] & {
  notaries: NotaryWithProfile
  profiles: Database["public"]["Tables"]["profiles"]["Row"]
}
