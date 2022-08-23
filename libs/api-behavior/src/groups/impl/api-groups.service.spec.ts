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
	});

	it('gets group', () => {

		const groupWithId = 0;
		const expectedGroup = testGroups[groupWithId];

		const actualGroup = service.get(groupWithId);

		expect(actualGroup).toEqual(expectedGroup);
	});

	describe('group update operations', () => {

		const updateTestFunction = (updateDto: UpdateGroupDto) => {
			const groupWithId = 0;

			service.update(groupWithId, updateDto);

			const actualGroup = service.get(groupWithId);
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

		const groupWithId = 0;

		service.delete(groupWithId);

		expect(() => {
			service.get(groupWithId);
		}).toThrowError(Error('group not found'));
	});
});