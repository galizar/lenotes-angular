import { Component, OnDestroy, OnInit } from "@angular/core";
import type { Subscription, User } from "@supabase/supabase-js";

import { supabase } from "@lenotes-ng/data-storage";

@Component({
	selector: 'lobby',
	templateUrl: './lobby.component.html',
	styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {

	user: User | null = null;
	authListener: Subscription | null = null;

	constructor() {}

	ngOnInit() {
		
		supabase.auth.getSessionFromUrl().then(({data}) => {
			if (data) this.user = data.user;
		});
			
		const { data: authListener } = supabase.auth.onAuthStateChange(
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