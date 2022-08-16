import { Group } from '@lenotes-ng/model';
import { CreateGroupDto, UpdateGroupDto } from '../index';

export interface IApiGroupsService {
	create(dto: CreateGroupDto): number;
	update(id: number, dto: UpdateGroupDto): void;
	get(id: number): Group;
	getAll(): Group[];
	delete(id: number): void;
}