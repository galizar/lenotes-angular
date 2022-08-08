import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

import { testGroups } from '@lenotes-ng/shared/assets';

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
