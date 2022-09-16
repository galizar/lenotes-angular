import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { 
	AbstractControl, 
	FormBuilder, 
	FormsModule, 
	ReactiveFormsModule, 
	ValidationErrors, 
	Validators
} from '@angular/forms';

import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { EnvObject } from '../environments';
import { environment } from '../environments/environment';

@Component({
	standalone: true,
	selector: 'auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		{provide: 'env', useValue: environment}
	]
})
export class AuthComponent {

	authType: 'signup' | 'login' = 'login';
	supabase: SupabaseClient;

	authForm = this.fb.nonNullable.group({
			email: ['', {
				validators: [
					Validators.required,
					Validators.email
				]
			}],
			password: ['', {
				validators: [
					Validators.required,
					Validators.minLength(6),
				]
			}],
			confirmPassword: ['']
		}, {
			validators: [this.passwordMatchValidator()] 
		});
	
	constructor( 
		private fb: FormBuilder,
		@Inject('env') env: EnvObject,
	) {
		this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
	}

	get email() { return this.authForm.get('email'); }
	get password() { return this.authForm.get('password') }
	get confirmPassword() { return this.authForm.get('confirmPassword'); }

	async handleAuth(type: 'login' | 'signup', email: string, password: string) {

		const { user, error } =
			type === 'login'
				? await this.supabase.auth.signIn({ email, password })
				: await this.supabase.auth.signUp({ email, password });
	}

	// TODO: wire this up
	submitAuthForm() {

		alert('check the console');
		console.log('email in form', this.email!.value);
		console.log('password in form', this.password!.value);
	}

	passwordMatchValidator() {
		return (control: AbstractControl): ValidationErrors | null => {

			if (this.authType === 'login') return null; // log in: no password to match

			const password = control.get('password');
			const confirmPassword = control.get('confirmPassword');

			const isValueEqual = password!.value === confirmPassword!.value;
			return isValueEqual ? null : { passwordMatch: 'passwords do not match' };
		}
	}

	toggleAuthType() {
		this.authForm.setValue({ 
			email: '', 
			password: '', 
			confirmPassword: ''
		});

		if (this.authType === 'signup') {
			this.authType = 'login';
		}
		else {
			this.authType = 'signup';
		}
	}
}