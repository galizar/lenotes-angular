import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Group } from '@lenotes-ng/model';
import { EnvObject } from '../../../environments';
import { CreateGroupDto, UpdateGroupDto } from '@lenotes-ng/api-behavior';
import { IGroupService } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GroupService implements IGroupService {

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

  create(dto: CreateGroupDto): Observable<number> {
    return this.http.post<number>(this.env.GROUPS_API_ROOT, dto);
  }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this.env.GROUPS_API_ROOT);
  }

  get(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.env.GROUPS_API_ROOT}/${id}`);
  }

  update(id: number, dto: UpdateGroupDto): Observable<object> {
    return this.http.patch(`${this.env.GROUPS_API_ROOT}/${id}`, dto, this.mergePatchOptions);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(`${this.env.GROUPS_API_ROOT}/${id}`);
  }
}