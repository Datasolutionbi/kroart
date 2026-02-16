export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            artworks: {
                Row: {
                    id: string
                    created_at: string
                    title: string
                    subtitle: string | null
                    meta_info: string | null
                    description: string | null
                    image_url: string
                    accent_color: string | null
                    order: number
                    slug: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    title: string
                    subtitle?: string | null
                    meta_info?: string | null
                    description?: string | null
                    image_url: string
                    accent_color?: string | null
                    order?: number
                    slug: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    title?: string
                    subtitle?: string | null
                    meta_info?: string | null
                    description?: string | null
                    image_url?: string
                    accent_color?: string | null
                    order?: number
                    slug?: string
                }
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
    }
}
