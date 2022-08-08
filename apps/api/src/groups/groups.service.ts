import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

import { Group } from '@lenotes-ng/shared-model';

const testGroups: Group[] = [
		{
			id: 0,
			name: 'group A',
			isTrashed: false
		},
		{
			id: 1,
			name: 'group B',
			isTrashed: false 
		},
		{
			id: 2,
			name: 'group C',
			isTrashed: true 
		}
]

@Injectable()
export class GroupsService {

  create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  getAll() {
    return testGroups; 
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
