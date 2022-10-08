import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

import { Group, ObjectMap } from '@lenotes-ng/model';
import { EnvObject } from '../../../environments';
import { CreateGroupDto, UpdateGroupDto } from '@lenotes-ng/api-behavior';
import { IGroupService } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GroupService implements IGroupService {

	private env;

  constructor(
		@Inject('env')
		env: EnvObject, 
		private http: HttpClient)
	 { 
		this.env = env;
	 }

  create(dto: CreateGroupDto): Observable<number> {
    return this.http.post<number>(this.env.GROUPS_API_ROOT, dto)
			.pipe(
				catchError(this.handleError)
			);
  }

  getAll(): Observable<ObjectMap<Group>> {
    return this.http.get<ObjectMap<Group>>(this.env.GROUPS_API_ROOT)
			.pipe(
				catchError(this.handleError)
			);
  }

  get(id: number): Observable<Group['props']> {
    return this.http.get<Group['props']>(`${this.env.GROUPS_API_ROOT}/${id}`)
			.pipe(
				catchError(this.handleError)
			);
  }

  update(id: number, dto: UpdateGroupDto): Observable<object> {
    return this.http.patch(`${this.env.GROUPS_API_ROOT}/updateOne/${id}`, dto)
			.pipe(
				catchError(this.handleError)
			);
  }

	batchUpdate(ids: number[], dto: UpdateGroupDto): Observable<object> {
		return this.http.patch(`${this.env.GROUPS_API_ROOT}/batchUpdate`, {ids, subDto: dto})
			.pipe(
				catchError(this.handleError)
			);
	}

  delete(id: number): Observable<object> {
    return this.http.delete(`${this.env.GROUPS_API_ROOT}/${id}`)
			.pipe(
				catchError(this.handleError)
			);
  }

	batchDelete(ids: Group['id'][]): Observable<object> {
		return this.http.patch(`${this.env.GROUPS_API_ROOT}/batchDelete`, {ids})
			.pipe(
				catchError(this.handleError)
			);
	}

	private handleError(error: HttpErrorResponse) {
		if (error.status === 0) {
			// client-side error
			console.error('An error occurred', error.error);
		} else {
			// back-end error
			console.log(`Server responded with error. Status: ${error.status}. Error body:`, error.error);
		}

		// user-facing error message
		return throwError(() => new Error('An error occurred :/. Please try again later.'));
	}
}
