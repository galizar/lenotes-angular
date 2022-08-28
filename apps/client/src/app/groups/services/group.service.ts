import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<number>(this.env.GROUPS_API_ROOT, dto);
  }

  getAll(): Observable<ObjectMap<Group>> {
    return this.http.get<ObjectMap<Group>>(this.env.GROUPS_API_ROOT);
  }

  get(id: number): Observable<Group['props']> {
    return this.http.get<Group['props']>(`${this.env.GROUPS_API_ROOT}/${id}`);
  }

  update(id: number, dto: UpdateGroupDto): Observable<object> {
    return this.http.patch(`${this.env.GROUPS_API_ROOT}/updateOne/${id}`, dto);
  }

	batchUpdate(ids: number[], dto: UpdateGroupDto): Observable<object> {
		return this.http.patch(`${this.env.GROUPS_API_ROOT}/batchUpdate`, {ids, dto});
	}

  delete(id: number): Observable<object> {
    return this.http.delete(`${this.env.GROUPS_API_ROOT}/${id}`);
  }
}