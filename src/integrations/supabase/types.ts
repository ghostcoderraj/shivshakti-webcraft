export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      enquiries: {
        Row: {
          city: string | null
          company_name: string | null
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
          phone: string | null
          product_interested: string | null
          source: Database["public"]["Enums"]["enquiry_source"] | null
          state: string | null
          status: Database["public"]["Enums"]["enquiry_status"] | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          product_interested?: string | null
          source?: Database["public"]["Enums"]["enquiry_source"] | null
          state?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"] | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          product_interested?: string | null
          source?: Database["public"]["Enums"]["enquiry_source"] | null
          state?: string | null
          status?: Database["public"]["Enums"]["enquiry_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          enable_schema: boolean | null
          id: string
          is_active: boolean | null
          page_slug: string | null
          question: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          enable_schema?: boolean | null
          id?: string
          is_active?: boolean | null
          page_slug?: string | null
          question: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          enable_schema?: boolean | null
          id?: string
          is_active?: boolean | null
          page_slug?: string | null
          question?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      local_seo: {
        Row: {
          created_at: string
          google_business_profile_url: string | null
          id: string
          local_keywords: string | null
          nap_address: string | null
          nap_name: string | null
          nap_phone: string | null
          service_locations: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          google_business_profile_url?: string | null
          id?: string
          local_keywords?: string | null
          nap_address?: string | null
          nap_name?: string | null
          nap_phone?: string | null
          service_locations?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          google_business_profile_url?: string | null
          id?: string
          local_keywords?: string | null
          nap_address?: string | null
          nap_name?: string | null
          nap_phone?: string | null
          service_locations?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          created_at: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          original_name: string | null
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          original_name?: string | null
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          original_name?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      page_seo: {
        Row: {
          canonical_url: string | null
          created_at: string
          enable_schema: boolean | null
          focus_keywords: string | null
          id: string
          is_indexed: boolean | null
          meta_description: string | null
          meta_title: string | null
          og_image: string | null
          og_title: string | null
          page_name: string
          page_slug: string
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          enable_schema?: boolean | null
          focus_keywords?: string | null
          id?: string
          is_indexed?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          og_title?: string | null
          page_name: string
          page_slug: string
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          enable_schema?: boolean | null
          focus_keywords?: string | null
          id?: string
          is_indexed?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          og_title?: string | null
          page_name?: string
          page_slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_alt: string | null
          image_url: string | null
          is_active: boolean | null
          meta_description: string | null
          meta_title: string | null
          name: string
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_alt?: string | null
          image_url?: string | null
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          applications: Json | null
          category_id: string | null
          created_at: string
          id: string
          images: Json | null
          is_active: boolean | null
          is_featured: boolean | null
          key_benefits: Json | null
          long_description: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          product_code: string | null
          seo_keywords: string | null
          short_description: string | null
          slug: string
          sort_order: number | null
          specifications: Json | null
          updated_at: string
        }
        Insert: {
          applications?: Json | null
          category_id?: string | null
          created_at?: string
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_featured?: boolean | null
          key_benefits?: Json | null
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          product_code?: string | null
          seo_keywords?: string | null
          short_description?: string | null
          slug: string
          sort_order?: number | null
          specifications?: Json | null
          updated_at?: string
        }
        Update: {
          applications?: Json | null
          category_id?: string | null
          created_at?: string
          id?: string
          images?: Json | null
          is_active?: boolean | null
          is_featured?: boolean | null
          key_benefits?: Json | null
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          product_code?: string | null
          seo_keywords?: string | null
          short_description?: string | null
          slug?: string
          sort_order?: number | null
          specifications?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
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
        Relationships: []
      }
      quote_requests: {
        Row: {
          admin_notes: string | null
          created_at: string
          customer_company: string | null
          customer_email: string | null
          customer_name: string
          customer_phone: string | null
          id: string
          product_id: string | null
          quantity: number | null
          special_requirements: string | null
          status: Database["public"]["Enums"]["quote_status"] | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          customer_company?: string | null
          customer_email?: string | null
          customer_name: string
          customer_phone?: string | null
          id?: string
          product_id?: string | null
          quantity?: number | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["quote_status"] | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          customer_company?: string | null
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string | null
          id?: string
          product_id?: string | null
          quantity?: number | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["quote_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_requests_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_settings: {
        Row: {
          created_at: string
          default_keywords: string | null
          default_meta_description: string | null
          default_meta_title: string | null
          google_analytics_id: string | null
          google_search_console_verification: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_keywords?: string | null
          default_meta_description?: string | null
          default_meta_title?: string | null
          google_analytics_id?: string | null
          google_search_console_verification?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_keywords?: string | null
          default_meta_description?: string | null
          default_meta_title?: string | null
          google_analytics_id?: string | null
          google_search_console_verification?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "super_admin" | "content_manager" | "seo_manager"
      enquiry_source: "form" | "whatsapp" | "call"
      enquiry_status: "new" | "contacted" | "closed"
      quote_status: "pending" | "sent" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "content_manager", "seo_manager"],
      enquiry_source: ["form", "whatsapp", "call"],
      enquiry_status: ["new", "contacted", "closed"],
      quote_status: ["pending", "sent", "closed"],
    },
  },
} as const
