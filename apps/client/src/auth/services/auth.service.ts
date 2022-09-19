import { Inject, Injectable } from '@angular/core';
import { createClient, Subscription, SupabaseClient, User } from '@supabase/supabase-js';

import { EnvObject } from '../../environments/EnvObject';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private supabase: SupabaseClient;
	user: User | null = null;
	listener: Subscription | null = null;

	constructor(
		@Inject('env') env: EnvObject
	) {
		this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
			autoRefreshToken: false
		});

		this.supabase.auth.getSessionFromUrl().then(({data}) => {
			if (data) this.user = data.user;
		});

		const { data: listener } = this.supabase.auth.onAuthStateChange(
			(event, session) => {
				this.user = session?.user ?? null;
			}
		);

		this.listener = listener;
	}

	signIn(email: string, password: string) {
		return this.supabase.auth.signIn({email, password});
	}

	signUp(email: string, password: string) {
		return this.supabase.auth.signUp({email, password});
	}
}