import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NoteProps, NoteMap } from '@lenotes-ng/model';
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
    return this.http.post<number>(this.env.NOTES_API_ROOT, dto);
  }

  getAll(): Observable<NoteMap> {
    return this.http.get<NoteMap>(this.env.NOTES_API_ROOT);
  }

  get(id: number): Observable<NoteProps> {
    return this.http.get<NoteProps>(`${this.env.NOTES_API_ROOT}/${id}`);
  }

	getInGroup(groupId: number): Observable<NoteMap> {
		return this.http.get<NoteMap>(`${this.env.NOTES_API_ROOT}/getInGroup/${groupId}`);
	}

	update(id: number, dto: UpdateNoteDto) {
		return this.http.patch(`${this.env.NOTES_API_ROOT}/updateOne/${id}`, dto);
	}

	batchUpdate(ids: number[], dto: UpdateNoteDto) {
		return this.http.patch(`${this.env.NOTES_API_ROOT}/batchUpdate`, {ids, subDto: dto});
	}

  delete(id: number): Observable<object> {
    return this.http.delete(`${this.env.NOTES_API_ROOT}/${id}`);
  }
}