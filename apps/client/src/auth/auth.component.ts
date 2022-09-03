import { Component } from '@angular/core';

import { supabase } from '@lenotes-ng/data-storage';
import { AppModule } from '../app/app.module';

@Component({
	standalone: true,
	selector: 'auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
})
export class AuthComponent {

	email: string = '';
	password: string = '';

	constructor() {}

	async handleLogin(type: 'signin' | 'signup') {

		const { user, error } =
			type === 'signin'
				? await supabase.auth.signIn({ email: this.email, password: this.password })
				: await supabase.auth.signUp({ email: this.email, password: this.password });
	}
}