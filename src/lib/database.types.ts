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
          role: 'admin' | 'broker' | 'member' | 'employer' | 'employee' | 'salary-employee'
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'admin' | 'broker' | 'member' | 'employer' | 'employee' | 'salary-employee'
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'admin' | 'broker' | 'member' | 'employer' | 'employee' | 'salary-employee'
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      regular_vehicles: {
        Row: {
          id: string
          make: string
          model: string
          year: number
          type: string
          status: string
          color: string | null
          mileage: number
          fuel_type: string
          transmission: string
          power: number
          engine_size: number | null
          electric_range: number | null
          equipment_variant: string
          delivery_time: number
          standard_equipment: string | null
          monthly_starting_rate: number | null
          gross_list_price: number
          custom_equipment: Json
          images: Json
          features: Json
          custom_features: Json
          available_colors: Json
          services: Json
          service_prices: Json
          leasing_rates: Json
          one_time_costs: Json
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          make: string
          model: string
          year: number
          type: string
          status?: string
          color?: string | null
          mileage?: number
          fuel_type: string
          transmission: string
          power: number
          engine_size?: number | null
          electric_range?: number | null
          equipment_variant: string
          delivery_time: number
          standard_equipment?: string | null
          monthly_starting_rate?: number | null
          gross_list_price: number
          custom_equipment?: Json
          images?: Json
          features?: Json
          custom_features?: Json
          available_colors?: Json
          services?: Json
          service_prices?: Json
          leasing_rates?: Json
          one_time_costs?: Json
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          make?: string
          model?: string
          year?: number
          type?: string
          status?: string
          color?: string | null
          mileage?: number
          fuel_type?: string
          transmission?: string
          power?: number
          engine_size?: number | null
          electric_range?: number | null
          equipment_variant?: string
          delivery_time?: number
          standard_equipment?: string | null
          monthly_starting_rate?: number | null
          gross_list_price?: number
          custom_equipment?: Json
          images?: Json
          features?: Json
          custom_features?: Json
          available_colors?: Json
          services?: Json
          service_prices?: Json
          leasing_rates?: Json
          one_time_costs?: Json
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      pool_vehicles: {
        Row: {
          id: string
          make: string
          model: string
          year: number
          type: string
          status: string
          color: string | null
          mileage: number
          fuel_type: string
          transmission: string
          power: number
          engine_size: number | null
          electric_range: number | null
          equipment_variant: string
          delivery_time: number
          standard_equipment: string | null
          monthly_starting_rate: number | null
          gross_list_price: number
          custom_equipment: Json
          images: Json
          features: Json
          custom_features: Json
          available_colors: Json
          services: Json
          service_prices: Json
          leasing_rates: Json
          one_time_costs: Json
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          make: string
          model: string
          year: number
          type: string
          status?: string
          color?: string | null
          mileage?: number
          fuel_type: string
          transmission: string
          power: number
          engine_size?: number | null
          electric_range?: number | null
          equipment_variant: string
          delivery_time: number
          standard_equipment?: string | null
          monthly_starting_rate?: number | null
          gross_list_price: number
          custom_equipment?: Json
          images?: Json
          features?: Json
          custom_features?: Json
          available_colors?: Json
          services?: Json
          service_prices?: Json
          leasing_rates?: Json
          one_time_costs?: Json
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          make?: string
          model?: string
          year?: number
          type?: string
          status?: string
          color?: string | null
          mileage?: number
          fuel_type?: string
          transmission?: string
          power?: number
          engine_size?: number | null
          electric_range?: number | null
          equipment_variant?: string
          delivery_time?: number
          standard_equipment?: string | null
          monthly_starting_rate?: number | null
          gross_list_price?: number
          custom_equipment?: Json
          images?: Json
          features?: Json
          custom_features?: Json
          available_colors?: Json
          services?: Json
          service_prices?: Json
          leasing_rates?: Json
          one_time_costs?: Json
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      salary_vehicles: {
        Row: {
          id: string
          make: string
          model: string
          year: number
          type: string
          status: string
          color: string | null
          mileage: number
          fuel_type: string
          transmission: string
          power: number
          engine_size: number | null
          electric_range: number | null
          equipment_variant: string
          delivery_time: number
          standard_equipment: string | null
          monthly_starting_rate: number | null
          gross_list_price: number
          custom_equipment: Json
          images: Json
          features: Json
          custom_features: Json
          available_colors: Json
          services: Json
          service_prices: Json
          leasing_rates: Json
          one_time_costs: Json
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          make: string
          model: string
          year: number
          type: string
          status?: string
          color?: string | null
          mileage?: number
          fuel_type: string
          transmission: string
          power: number
          engine_size?: number | null
          electric_range?: number | null
          equipment_variant: string
          delivery_time: number
          standard_equipment?: string | null
          monthly_starting_rate?: number | null
          gross_list_price: number
          custom_equipment?: Json
          images?: Json
          features?: Json
          custom_features?: Json
          available_colors?: Json
          services?: Json
          service_prices?: Json
          leasing_rates?: Json
          one_time_costs?: Json
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          make?: string
          model?: string
          year?: number
          type?: string
          status?: string
          color?: string | null
          mileage?: number
          fuel_type?: string
          transmission?: string
          power?: number
          engine_size?: number | null
          electric_range?: number | null
          equipment_variant?: string
          delivery_time?: number
          standard_equipment?: string | null
          monthly_starting_rate?: number | null
          gross_list_price?: number
          custom_equipment?: Json
          images?: Json
          features?: Json
          custom_features?: Json
          available_colors?: Json
          services?: Json
          service_prices?: Json
          leasing_rates?: Json
          one_time_costs?: Json
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      tickets: {
        Row: {
          id: string
          title: string
          description: string
          status: 'open' | 'in_progress' | 'waiting_for_response' | 'resolved' | 'closed'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          created_by: string
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          status?: 'open' | 'in_progress' | 'waiting_for_response' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          created_by: string
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: 'open' | 'in_progress' | 'waiting_for_response' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          created_by?: string
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ticket_messages: {
        Row: {
          id: string
          ticket_id: string
          user_id: string
          message: string
          is_internal: boolean
          created_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          user_id: string
          message: string
          is_internal?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          user_id?: string
          message?: string
          is_internal?: boolean
          created_at?: string
        }
      }
    }
  }
}
