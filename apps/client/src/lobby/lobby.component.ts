import { Component, OnDestroy, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { createClient, Subscription, SupabaseClient, User } from "@supabase/supabase-js";

// import { AuthService } from "../auth/services/auth.service";
// import { EnvObject } from "../environments";

@Component({
	selector: 'lobby',
	templateUrl: './lobby.component.html',
	styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent { //implements OnDestroy

	constructor(
		// @Inject('env') env: EnvObject,
		// public auth: AuthService
	) { 
	}

	// ngOnDestroy() {
	// 	this.auth.listener?.unsubscribe();
	// }
}
