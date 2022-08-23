import { DomainObjectStorage, NaiveGroupsStorage } from '@lenotes-ng/data-storage';
import { Group, testGroups } from '@lenotes-ng/model';
import { ApiGroupsService } from './api-groups.service';
import { CreateGroupDto, UpdateGroupDto } from '../../index';

describe('ApiGroupsService', () => {

	let storage: DomainObjectStorage<Group>;
	let service: ApiGroupsService;

	beforeEach(() => {

		storage = new NaiveGroupsStorage();
		service = new ApiGroupsService(storage);
	});

	it('creates group', () => {

		const newGroup: CreateGroupDto = {
			name: 'a new group created at ' + Date.now(),
			isTrashed: false
		};

		const createdGroupId = service.create(newGroup);

		const actualGroup = service.get(createdGroupId);

		for (const prop of Object.keys(newGroup)) {
			const key = prop as keyof typeof newGroup;
			expect(actualGroup[key]).toEqual(newGroup[key]);
		}
		
		expect(actualGroup.id).toEqual(createdGroupId);
	});

	it('gets group', () => {

		const groupToGet = testGroups[0];

		const actualGroup = service.get(groupToGet.id);

		expect(actualGroup).toEqual(groupToGet);
	});

	describe('group update operations', () => {

		const updateTestFunction = (updateDto: UpdateGroupDto) => {
			const groupToUpdate = service.get(0);

			service.update(groupToUpdate.id, updateDto);

			const actualGroup = service.get(groupToUpdate.id);
			for (const [prop, value] of Object.entries(updateDto)) {
				expect(actualGroup[prop as keyof UpdateGroupDto]).toEqual(value)
			}
		};

		it('update name', () => {
			updateTestFunction({name: 'a freshly baked name at ' + Date.now()});
		});

		it('update isTrashed', () => {
			updateTestFunction({isTrashed: true});
		});
	})

	it('batch updates groups', () => {
		throw Error('not implemented');
	});

	it('removes group', () => {

		const groupToRemove = service.get(0);

		service.delete(groupToRemove.id);

		expect(() => {
			service.get(groupToRemove.id);
		}).toThrowError(Error('group not found'));
	});
});