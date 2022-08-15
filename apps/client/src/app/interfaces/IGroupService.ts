import { Observable } from 'rxjs';

import { CreateGroupDto, UpdateDto } from '../dto';
import { Group } from '@lenotes-ng/shared/model';

export interface IGroupService {
	/** Returns id of created group */
	create(dto: CreateGroupDto): Observable<number>;
	update(dto: UpdateDto<Group>): Observable<object>;
	get(id: number): Observable<Group>;
	getAll(): Observable<Group[]>;
	delete(id: number): Observable<object>;
}