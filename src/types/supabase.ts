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
      bookings: {
        Row: {
          client_id: string
          created_at: string
          id: string
          location: string | null
          notary_id: string
          notes: string | null
          service_date: string
          service_time: string
          service_type: string
          status: string | null
          total_cost: number | null
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          location?: string | null
          notary_id: string
          notes?: string | null
          service_date: string
          service_time: string
          service_type: string
          status?: string | null
          total_cost?: number | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          location?: string | null
          notary_id?: string
          notes?: string | null
          service_date?: string
          service_time?: string
          service_type?: string
          status?: string | null
          total_cost?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_notary_id_fkey"
            columns: ["notary_id"]
            isOneToOne: false
            referencedRelation: "notaries"
            referencedColumns: ["id"]
          },
        ]
      }
      notaries: {
        Row: {
          address: string | null
          availability: Json | null
          availability_schedule: Json | null
          business_address: string | null
          business_name: string | null
          city: string
          commission_expiry_date: string | null
          commission_number: string | null
          created_at: string
          description: string | null
          hourly_rate: number | null
          id: string
          is_mobile: boolean | null
          is_online: boolean | null
          is_verified: boolean | null
          languages: string[] | null
          latitude: number | null
          longitude: number | null
          notary_county: string | null
          notary_type: string | null
          phone: string | null
          profile_completed: boolean | null
          profile_id: string
          rating: number | null
          review_count: number | null
          seal_image_url: string | null
          services: string[] | null
          signature_image_url: string | null
          specializations: string[] | null
          state: string
          travel_radius: number | null
          updated_at: string
          verification_status: string | null
          years_experience: number | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          availability?: Json | null
          availability_schedule?: Json | null
          business_address?: string | null
          business_name?: string | null
          city: string
          commission_expiry_date?: string | null
          commission_number?: string | null
          created_at?: string
          description?: string | null
          hourly_rate?: number | null
          id?: string
          is_mobile?: boolean | null
          is_online?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          latitude?: number | null
          longitude?: number | null
          notary_county?: string | null
          notary_type?: string | null
          phone?: string | null
          profile_completed?: boolean | null
          profile_id: string
          rating?: number | null
          review_count?: number | null
          seal_image_url?: string | null
          services?: string[] | null
          signature_image_url?: string | null
          specializations?: string[] | null
          state: string
          travel_radius?: number | null
          updated_at?: string
          verification_status?: string | null
          years_experience?: number | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          availability?: Json | null
          availability_schedule?: Json | null
          business_address?: string | null
          business_name?: string | null
          city?: string
          commission_expiry_date?: string | null
          commission_number?: string | null
          created_at?: string
          description?: string | null
          hourly_rate?: number | null
          id?: string
          is_mobile?: boolean | null
          is_online?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          latitude?: number | null
          longitude?: number | null
          notary_county?: string | null
          notary_type?: string | null
          phone?: string | null
          profile_completed?: boolean | null
          profile_id?: string
          rating?: number | null
          review_count?: number | null
          seal_image_url?: string | null
          services?: string[] | null
          signature_image_url?: string | null
          specializations?: string[] | null
          state?: string
          travel_radius?: number | null
          updated_at?: string
          verification_status?: string | null
          years_experience?: number | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notaries_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notary_documents: {
        Row: {
          created_at: string
          document_name: string
          document_type: string
          document_url: string
          file_size: number | null
          id: string
          mime_type: string | null
          notary_id: string | null
          upload_date: string
          updated_at: string
          verification_notes: string | null
          verification_status: string | null
        }
        Insert: {
          created_at?: string
          document_name: string
          document_type: string
          document_url: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          notary_id?: string | null
          upload_date?: string
          updated_at?: string
          verification_notes?: string | null
          verification_status?: string | null
        }
        Update: {
          created_at?: string
          document_name?: string
          document_type?: string
          document_url?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          notary_id?: string | null
          upload_date?: string
          updated_at?: string
          verification_notes?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notary_documents_notary_id_fkey"
            columns: ["notary_id"]
            isOneToOne: false
            referencedRelation: "notaries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          notary_id: string
          rating: number
          reviewer_id: string
          service_date: string | null
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          notary_id: string
          rating: number
          reviewer_id: string
          service_date?: string | null
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          notary_id?: string
          rating?: number
          reviewer_id?: string
          service_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_notary_id_fkey"
            columns: ["notary_id"]
            isOneToOne: false
            referencedRelation: "notaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_codes: {
        Row: {
          id: string
          email: string
          code: string
          type: string
          expires_at: string
          used: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          code: string
          type: string
          expires_at: string
          used?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          code?: string
          type?: string
          expires_at?: string
          used?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
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
    : never = never,
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
    : never = never,
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
    : never = never,
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
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never

// Custom types for joined data
export type NotaryWithProfile = Tables<"notaries"> & {
  profiles: Tables<"profiles">
}

export type ReviewWithProfile = Tables<"reviews"> & {
  profiles: Tables<"profiles">
}

export type BookingWithDetails = Tables<"bookings"> & {
  notaries: NotaryWithProfile
  profiles: Tables<"profiles">
}
