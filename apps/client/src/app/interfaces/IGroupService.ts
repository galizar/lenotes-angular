import { Observable } from 'rxjs';

import { CreateGroupDto, UpdateGroupDto } from '@lenotes-ng/api-behavior';
import { ObjectMap, Group } from '@lenotes-ng/model';

export interface IGroupService {
	/** Returns id of created group */
	create(dto: CreateGroupDto): Observable<Group['id']>;

	update(id: Group['id'], dto: UpdateGroupDto): Observable<object>;
	batchUpdate(ids: Group['id'][], dto: UpdateGroupDto): Observable<object>;

	get(id: Group['id']): Observable<Group['props']>;
	getAll(): Observable<ObjectMap<Group>>;

	delete(id: Group['id']): Observable<object>;
	batchDelete(ids: Group['id'][]): Observable<object>;
}