import { PostgrestError } from "@supabase/supabase-js";

/** Validates that a query returned data and didn't return an error */
export function validate(data: any, error: PostgrestError | null) {
	if (error) {
		throw Error(error.message);
	} else if (!data) {
		throw Error('not found');
	}
}