import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpResponse,
	HttpUserEvent
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(
		public auth: AuthService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const session = this.auth.session;

		if (!session) {
			console.error('not authenticated');
			return next.handle(req);
		} 

		const newHeaders = req.headers.set('Authorization', `Bearer ${session.access_token}`);
		const authenticatedReq = req.clone({headers: newHeaders});

		return next.handle(authenticatedReq);
	}
}
