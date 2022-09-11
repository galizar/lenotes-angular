export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      groups: {
        Row: {
          id: number;
          name: string | null;
          is_trashed: boolean | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          name?: string | null;
          is_trashed?: boolean | null;
          user_id: string;
        };
        Update: {
          id?: number;
          name?: string | null;
          is_trashed?: boolean | null;
          user_id?: string;
        };
      };
      notes: {
        Row: {
          id: number;
          name: string | null;
          content: string | null;
          is_trashed: boolean | null;
          group_id: number | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          name?: string | null;
          content?: string | null;
          is_trashed?: boolean | null;
          group_id?: number | null;
          user_id: string;
        };
        Update: {
          id?: number;
          name?: string | null;
          content?: string | null;
          is_trashed?: boolean | null;
          group_id?: number | null;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

