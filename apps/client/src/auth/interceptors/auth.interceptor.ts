import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(
		public auth: AuthService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const session = this.auth.session;

		// modify this to not even make a request to the server when not authenticated
		if (!session) {
			console.error('not authenticated');
			return next.handle(req);
		} 

		console.log('setting authorization header');
		const newHeaders = req.headers.set('Authorization', `Bearer ${session.access_token}`);

		const authenticatedReq = req.clone({headers: newHeaders});

		console.log('new headers', authenticatedReq.headers.keys());

		return next.handle(authenticatedReq);
	}
}