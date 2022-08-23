import { Group, GroupMap } from '@lenotes-ng/model';
import { CreateGroupDto, UpdateGroupDto, BatchUpdateDto } from '../index';

export interface IApiGroupsService {
	create(dto: CreateGroupDto): number;
	get(id: number): Group;
	getAll(): GroupMap;
	update(id: number, dto: UpdateGroupDto): void;
	batchUpdate(dto: BatchUpdateDto<UpdateGroupDto>): void;
	delete(id: number): void;
}