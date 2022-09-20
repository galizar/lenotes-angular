import { Inject, Injectable } from '@angular/core';
import { createClient, Subscription, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

import { EnvObject } from '../../environments/EnvObject';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private supabase: SupabaseClient;
	user = new BehaviorSubject<User | null>(null);
	listener: Subscription | null = null;

	constructor(
		@Inject('env') env: EnvObject,
	) {
		// iff this property is set in local storage keep signed in
		const keepSignedIn = localStorage.getItem('keepSignedIn');

		this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
			autoRefreshToken: keepSignedIn ? true : false
		});

		this.supabase.auth.getSessionFromUrl().then(({data}) => {
			if (data) this.user.next(data.user);
		});

		const { data: listener } = this.supabase.auth.onAuthStateChange(
			(event, session) => {
				this.user.next(session?.user ?? null);
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