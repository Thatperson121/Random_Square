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
      snippets: {
        Row: {
          id: string
          title: string
          description: string | null
          code: string
          language: string
          author_id: string | null
          created_at: string
          tags: string[]
          is_public: boolean
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          code: string
          language: string
          author_id?: string | null
          created_at?: string
          tags?: string[]
          is_public?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          code?: string
          language?: string
          author_id?: string | null
          created_at?: string
          tags?: string[]
          is_public?: boolean
        }
      }
    }
  }
}