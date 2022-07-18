import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Note } from '../model/Note';
import { EnvObject } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

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

  create(name: string, groupId: number): Observable<Note> {
    return this.http.post<Note>(this.env.NOTES_API_ROOT, {name, groupId});
  }

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.env.NOTES_API_ROOT);
  }

  get(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.env.NOTES_API_ROOT}/${id}`);
  }

  rename(id: number, newName: string): Observable<any> {
    return this.http.patch(`${this.env.NOTES_API_ROOT}/${id}`, {name: newName}, this.mergePatchOptions);
  }

  move(id: number, toGroupId: number): Observable<any> {
    return this.http.patch(`${this.env.NOTES_API_ROOT}/${id}`, {groupId: toGroupId}, this.mergePatchOptions);
  }

  setContent(id: number, content: string): Observable<any> {
    return this.http.patch(`${this.env.NOTES_API_ROOT}/${id}`, {content}, this.mergePatchOptions);
  }

  trash(id: number): Observable<any> {
    return this.http.patch(`${this.env.NOTES_API_ROOT}/${id}`, {isTrashed: true}, this.mergePatchOptions);
  }

  batchTrash(ids: number[]): Observable<any> {
    return this.http.post(`${this.env.NOTES_API_ROOT}/batchTrashOperation`, {ids});
  }
  
  trashInGroup(groupId: number): Observable<any> {
    return this.http.post(`${this.env.NOTES_API_ROOT}/trashInGroupOperation/`, {groupId});
  }

  restore(id: number): Observable<any> {
    return this.http.patch(`${this.env.NOTES_API_ROOT}/${id}`, {isTrashed: false}, this.mergePatchOptions);
  }

  restoreInGroup(groupId: number): Observable<any> {
    return this.http.post(`${this.env.NOTES_API_ROOT}/restoreInGroupOperation`, {groupId});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.env.NOTES_API_ROOT}/${id}`);
  }

  batchDelete(ids: number[]): Observable<any> {
    return this.http.post(`${this.env.NOTES_API_ROOT}/batchDeleteOperation`, {ids})
  }

  deleteInGroup(groupId: number): Observable<any> {
    return this.http.post(`${this.env.NOTES_API_ROOT}/deleteInGroupOperation`, {groupId});
  }
}