import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Group } from '@lenotes-ng/shared/model';
import { EnvObject } from '../../environments';
import { UpdateDto } from '../dto';

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

  update(id: number, dto: UpdateDto<Group>): Observable<any> {
    return this.http.patch(`${this.env.GROUPS_API_ROOT}/${id}`, dto, this.mergePatchOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.env.GROUPS_API_ROOT}/${id}`);
  }
}