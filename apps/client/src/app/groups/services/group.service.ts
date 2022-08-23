import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GroupProps, GroupMap } from '@lenotes-ng/model';
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

  getAll(): Observable<GroupMap> {
    return this.http.get<GroupMap>(this.env.GROUPS_API_ROOT);
  }

  get(id: number): Observable<GroupProps> {
    return this.http.get<GroupProps>(`${this.env.GROUPS_API_ROOT}/${id}`);
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