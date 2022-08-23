import { Observable } from 'rxjs';

import { CreateGroupDto, UpdateGroupDto } from '@lenotes-ng/api-behavior';
import { Group, GroupMap } from '@lenotes-ng/model';

export interface IGroupService {
	/** Returns id of created group */
	create(dto: CreateGroupDto): Observable<number>;
	update(id: number, dto: UpdateGroupDto): Observable<object>;
	get(id: number): Observable<Group>;
	getAll(): Observable<GroupMap>;
	delete(id: number): Observable<object>;
}