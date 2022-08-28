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

	it('creates group', async () => {

		const newGroup: CreateGroupDto = {
			name: 'a new group created at ' + Date.now(),
			isTrashed: false
		};

		const createdGroupId = await service.create(newGroup);

		const actualGroup = await service.get(createdGroupId);

		for (const prop of Object.keys(newGroup)) {
			const key = prop as keyof typeof newGroup;
			expect(actualGroup[key]).toEqual(newGroup[key]);
		}
	});

	it('gets group', async () => {

		const groupWithId = 0;
		const expectedGroup = testGroups[groupWithId];

		const actualGroup = await service.get(groupWithId);

		expect(actualGroup).toEqual(expectedGroup);
	});

	describe('group update operations', () => {

		const updateTestFunction = async (updateDto: UpdateGroupDto) => {
			const groupWithId = 0;

			await service.update(groupWithId, updateDto);

			const actualGroup = await service.get(groupWithId);
			for (const [prop, value] of Object.entries(updateDto)) {
				expect(actualGroup[prop as keyof UpdateGroupDto]).toEqual(value)
			}
		};

		it('update name', async () => {
			await updateTestFunction({name: 'a freshly baked name at ' + Date.now()});
		});

		it('update isTrashed', async () => {
			await updateTestFunction({isTrashed: true});
		});
	})

	it('batch updates groups', () => {
		throw Error('not implemented');
	});

	it('removes group', async () => {

		const groupWithId = 0;

		await service.delete(groupWithId);

		try {
			await service.get(groupWithId);
		} catch (e) {
			expect(e).toEqual(Error('group not found'));
		}
	});
});