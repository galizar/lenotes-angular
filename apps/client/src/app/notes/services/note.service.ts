import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Note } from '@lenotes-ng/model';
import { INoteService } from '../../interfaces';
import { EnvObject } from '../../../environments';
import { CreateNoteDto, UpdateNoteDto } from '@lenotes-ng/api-behavior';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements INoteService {

	private env: EnvObject;
  private mergePatchOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/merge-patch+json' // RFC 7396
    })
  }

  constructor(
		@Inject('env')
		env: EnvObject,
		private http: HttpClient) { 
			this.env = env;
		}

  create(dto: CreateNoteDto): Observable<number> {
    return this.http.post<number>(this.env.NOTES_API_ROOT, dto);
  }

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.env.NOTES_API_ROOT);
  }

  get(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.env.NOTES_API_ROOT}/${id}`);
  }

	getInGroup(groupId: number): Observable<Note[]> {
		return this.http.get<Note[]>(`${this.env.NOTES_API_ROOT}/getInGroup/${groupId}`);
	}

	update(id: number, dto: UpdateNoteDto) {
		return this.http.patch(`${this.env.NOTES_API_ROOT}/${id}`, dto, this.mergePatchOptions)
	}

  //batchTrash(ids: number[]): Observable<any> {
  //  return this.http.post(`${this.env.NOTES_API_ROOT}/batchTrashOperation`, {ids});
  //}
  
  //trashInGroup(groupId: number): Observable<any> {
  //  return this.http.post(`${this.env.NOTES_API_ROOT}/trashInGroupOperation/`, {groupId});
  //}

  //restoreInGroup(groupId: number): Observable<any> {
  //  return this.http.post(`${this.env.NOTES_API_ROOT}/restoreInGroupOperation`, {groupId});
  //}

  delete(id: number): Observable<object> {
    return this.http.delete(`${this.env.NOTES_API_ROOT}/${id}`);
  }

  //batchDelete(ids: number[]): Observable<any> {
  //  return this.http.post(`${this.env.NOTES_API_ROOT}/batchDeleteOperation`, {ids})
  //}

  //deleteInGroup(groupId: number): Observable<any> {
  //  return this.http.post(`${this.env.NOTES_API_ROOT}/deleteInGroupOperation`, {groupId});
  //}
}