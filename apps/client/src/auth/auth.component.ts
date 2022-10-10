import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { 
	AbstractControl, 
	FormBuilder, 
	FormControl, 
	FormsModule, 
	ReactiveFormsModule, 
	ValidationErrors, 
	Validators
} from '@angular/forms';

import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

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
		{provide: 'env', useValue: environment},
	]
})
export class AuthComponent {

	authType: 'signup' | 'login' = 'login';

	authForm = this.fb.group({
			email: new FormControl('', {
				nonNullable: true,
				validators: [
					Validators.required,
					Validators.email
				]
			}),
			password: new FormControl('', {
				nonNullable: true,
				validators: [
					Validators.required,
					Validators.minLength(6),
				]
			}),
			confirmPassword: new FormControl('', {
				nonNullable: true
			}),
			keepSignedIn: new FormControl(false, {
				nonNullable: true
			})
		}, {
			validators: [this.passwordMatchValidator()] 
		});
	
	constructor( 
		private fb: FormBuilder,
		public auth: AuthService
	) { 
	}

	get email() { return this.authForm.get('email'); }
	get password() { return this.authForm.get('password'); }
	get confirmPassword() { return this.authForm.get('confirmPassword'); }
	get keepSignedIn() { return this.authForm.get('keepSignedIn'); }

	async handleAuth(type: 'login' | 'signup', email: string, password: string) {
		const { data, error } =
			type === 'login'
				? await this.auth.signIn(email, password)
				: await this.auth.signUp(email, password);

		if (type === 'signup' && !error) {
			alert('Please check your email for verification');
		} else if (error) {
			alert(`An error occurred ${error.message}. Please try again.`);
		}
	}

	submitAuthForm() {
		if (this.keepSignedIn) {
			localStorage.setItem('keepSignedIn', 'yes');
		}
		this.handleAuth(this.authType, this.email!.value, this.password!.value);
	}

	passwordMatchValidator() {
		return (control: AbstractControl): ValidationErrors | null => {

			if (this.authType === 'login') return null;

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
			confirmPassword: '',
			keepSignedIn: false
		});

		this.authForm.markAsUntouched();
		this.authForm.markAsPristine();

		if (this.authType === 'signup') {
			this.authType = 'login';
		}
		else {
			this.authType = 'signup';
		}
	}
}