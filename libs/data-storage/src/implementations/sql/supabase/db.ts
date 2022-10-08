import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config();

import { Database } from './schema';

/** A supabase client that is set through the setSupabase function */
export let supabase: SupabaseClient<Database>;

/** Sets the supabase client. 
 * 
 * @param accessToken - an optional bearer access token with which to
 * authenticate requests. If not provided, the client will be unauthenticated
*/
export function setSupabase(accessToken?: string) {
	if (accessToken) {
		supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!, {
			auth: {
				persistSession: false
			},
			global: {
				headers: {
					Authorization: accessToken
				}
			}
		});
	} else {
		supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!, {
			auth: {
				persistSession: false
			}
		});
	}
}

setSupabase();
