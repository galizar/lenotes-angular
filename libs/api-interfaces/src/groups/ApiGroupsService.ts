import { Group } from '@lenotes-ng/model';
import { CreateGroupDto, UpdateGroupDto } from './dto';

export interface ApiGroupsService {
	create(dto: CreateGroupDto): number;
	update(dto: UpdateGroupDto): void;
	get(id: number): Group;
	getAll(): Group[];
}