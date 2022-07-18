import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Group } from '../model/Group';
import { EnvObject } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

	private env;
  private mergePatchOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/merge-patch+json' // RFC 7396
    })
  }

  constructor(
		@Inject('env')
		env: EnvObject, 
		private http: HttpClient)
	 { 
		this.env = env;
	 }

  create(name: string): Observable<Group> {
    return this.http.post<Group>(this.env.GROUPS_API_ROOT, {name});
  }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this.env.GROUPS_API_ROOT);
  }

  get(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.env.GROUPS_API_ROOT}/${id}`);
  }

  rename(id: number, newName: string): Observable<any> {
    return this.http.patch(`${this.env.GROUPS_API_ROOT}/${id}`, {name: newName}, this.mergePatchOptions);
  }

  trash(id: number): Observable<any> {
    return this.http.patch(`${this.env.GROUPS_API_ROOT}/${id}`, {isTrashed: true}, this.mergePatchOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.env.GROUPS_API_ROOT}/${id}`);
  }

  batchDelete(ids: number[]): Observable<any> {
    return this.http.post(`${this.env.GROUPS_API_ROOT}/batchDeleteOperation`, {ids});
  }
}