import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';

import { testGroups } from '@lenotes-ng/shared/assets';
import { Group } from '@lenotes-ng/shared/model';

@Injectable()
export class GroupsService { // this service is in stub state at the moment

	// use a closure here to "pass by value"
	private groups: Group[] = (() => {
		return testGroups;
	})();

	// initialize id Pk
	private idPk = testGroups.reduce((prev, curr) => {
		if (prev.id > curr.id)
			return prev;
		else
			return curr;
	}).id;

  create(createGroupDto: CreateGroupDto): Group {

		this.idPk++;

		const newGroup = {
			...createGroupDto,
			id: (() => this.idPk)()
		};

		this.groups.push(newGroup);
    return newGroup;
  }

  getAll() {
    return this.groups; 
  }

  get(id: number): Group {
		const group = this.groups.find(g => g.id === id);
		// the controller will have to handle errors thrown by this serviec
		if (group === undefined) {
			throw Error('group not found');
		}
		return group;
  }

  update(id: number, dto: UpdateGroupDto) {
		const groupToUpdate = this.get(id);
		const updatedGroup = {...groupToUpdate, ...dto};

		this.groups = this.groups.map(group => {
			if (group.id === id) {
				return updatedGroup;
			} else {
				return group;
			}
		});
  }

  remove(id: number) {

		// I reckon a database throws an error if you try to get something
		// that doesn't exist in there, so throwing an error here too if the group
		// doesn't exist
		this.get(id);

		this.groups = this.groups.filter(group => group.id !== id);
  }
}
