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
          name: string;
          is_trashed: boolean;
          user_id: string;
        };
        Insert: {
          id?: number;
          name: string;
          is_trashed: boolean;
          user_id: string;
        };
        Update: {
          id?: number;
          name?: string;
          is_trashed?: boolean;
          user_id?: string;
        };
      };
      notes: {
        Row: {
          id: number;
          name: string;
          content: string;
          is_trashed: boolean;
          group_id: number | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          name: string;
          content: string;
          is_trashed: boolean;
          group_id?: number | null;
          user_id: string;
        };
        Update: {
          id?: number;
          name?: string;
          content?: string;
          is_trashed?: boolean;
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
