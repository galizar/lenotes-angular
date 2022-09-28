import { createClient, SupabaseClient, SupportedStorage } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config();

import { Database } from './schema';

//function inMemoryStorageProvider(): SupportedStorage {
//  const items = new Map();
//  return ({
//    getItem: (key: string) => items.get(key),
//    setItem: (key: string, value: string) => {
//      items.set(key, value);
//    },
//    removeItem: (key: string) => {
//      items.delete(key);
//    }
//  }) as SupportedStorage;
//}

/** A supabase client that is set through the setSupabase function */
export let supabase: SupabaseClient;

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

//class SupabaseService {
//
//	private _client!: SupabaseClient;
//
//	constructor() {
//		this.setClient();
//	}
//
//	get client() { return this._client };
//
//	/** Sets the supabase client. 
//	 * 
//	 * @param accessToken - an optional bearer access token with which to
//	 * authenticate requests. If not provided, the client will be unauthenticated
//	*/
//	setClient(accessToken?: string) {
//		if (accessToken) {
//			this._client = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!, {
//				auth: {
//					persistSession: false
//				},
//				global: {
//					headers: {
//						Authorization: accessToken
//					}
//				}
//			});
//		} else {
//			this._client = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!, {
//				auth: {
//					persistSession: false
//				}
//			});
//		}
//	}
//}

//export const supabase = new SupabaseService();