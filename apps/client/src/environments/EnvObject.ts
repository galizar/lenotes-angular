import { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types";

export interface EnvObject {
	production: boolean,
	GROUPS_API_ROOT: string,
	NOTES_API_ROOT: string,
	SUPABASE_KEY: string,
	SUPABASE_URL: string,
}