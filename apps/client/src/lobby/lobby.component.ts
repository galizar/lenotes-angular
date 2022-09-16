import { Component, OnDestroy, OnInit, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { createClient, Subscription, SupabaseClient, User } from "@supabase/supabase-js";

import { EnvObject } from "../environments";

@Component({
	selector: 'lobby',
	templateUrl: './lobby.component.html',
	styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent implements OnInit, OnDestroy {

	user: User | null = null;
	authListener: Subscription | null = null;

	supabase: SupabaseClient;

	constructor(
		@Inject('env') env: EnvObject,
		private fb: FormBuilder
	) {
		this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
	}

	ngOnInit() {

		this.supabase.auth.getSessionFromUrl().then(({data}) => {
			if (data) this.user = data.user;
		});
			
		const { data: authListener } = this.supabase.auth.onAuthStateChange(
			(event, session) => {
				this.user = session?.user ?? null;
			}
		);

		this.authListener = authListener;
	}

	ngOnDestroy() {

		this.authListener?.unsubscribe();
	}
}
