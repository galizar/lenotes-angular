import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { ObjectMap, Note } from '@lenotes-ng/model';
import { INoteService } from '../../interfaces';
import { EnvObject } from '../../../environments';
import { CreateNoteDto, UpdateNoteDto } from '@lenotes-ng/api-behavior';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements INoteService {

	private env: EnvObject;

  constructor(
		@Inject('env')
		env: EnvObject,
		private http: HttpClient) { 
			this.env = env;
		}

  create(dto: CreateNoteDto): Observable<number> {
    return this.http.post<number>(this.env.NOTES_API_ROOT, dto)
			.pipe(
				catchError(this.handleError)
			);
  }

  getAll(): Observable<ObjectMap<Note>> {
    return this.http.get<ObjectMap<Note>>(this.env.NOTES_API_ROOT)
			.pipe(
				catchError(this.handleError)
			);
  }

  get(id: number): Observable<Note['props']> {
    return this.http.get<Note['props']>(`${this.env.NOTES_API_ROOT}/${id}`)
			.pipe(
				catchError(this.handleError)
			);
  }

	getInGroup(groupId: number): Observable<ObjectMap<Note>> {
		return this.http.get<ObjectMap<Note>>(`${this.env.NOTES_API_ROOT}/getInGroup/${groupId}`)
			.pipe(
				catchError(this.handleError)
			);
	}

	update(id: number, dto: UpdateNoteDto) {
		return this.http.patch(`${this.env.NOTES_API_ROOT}/updateOne/${id}`, dto)
			.pipe(
				catchError(this.handleError)
			);
	}

	batchUpdate(ids: number[], dto: UpdateNoteDto) {
		return this.http.patch(`${this.env.NOTES_API_ROOT}/batchUpdate`, {ids, subDto: dto})
			.pipe(
				catchError(this.handleError)
			);
	}

  delete(id: number): Observable<object> {
    return this.http.delete(`${this.env.NOTES_API_ROOT}/${id}`)
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