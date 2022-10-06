import { ObjectMap, Group } from '@lenotes-ng/model';
import { CreateGroupDto, UpdateGroupDto, BatchUpdateDto } from '../index';

export interface IApiGroupsService {
	create(dto: CreateGroupDto): Promise<Group['id']>;

	get(id: Group['id']): Promise<Group['props']>;
	getAll(): Promise<ObjectMap<Group>>;

	update(id: Group['id'], dto: UpdateGroupDto): Promise<void>;
	batchUpdate(dto: BatchUpdateDto<UpdateGroupDto>): Promise<void>;

	delete(id: Group['id']): Promise<void>;
	batchDelete(ids: Array<Group['id']>): Promise<void>;
}
