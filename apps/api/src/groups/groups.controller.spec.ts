import { Test, TestingModule } from '@nestjs/testing';

import { GroupsController } from './groups.controller';
import { testGroups, Group } from '@lenotes-ng/model';
import { CreateGroupDto, UpdateGroupDto } from '@lenotes-ng/data-storage';
import { DomainObjectStorage, NaiveGroupsStorage } from '@lenotes-ng/data-storage';

describe('GroupsController', () => {
  let controller: GroupsController;
	let groupsStorage: DomainObjectStorage<Group>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
				{
					provide: DomainObjectStorage,
					useValue: new NaiveGroupsStorage()
				}
			],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
		groupsStorage = module.get<DomainObjectStorage<Group>>(DomainObjectStorage);

		jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

	describe('create handler', () => {

		it('returns id of created group', async () => {

			const resultId = 3;
			const createGroupDto: CreateGroupDto = {
				name: 'a name created at ' + Date.now(),
				isTrashed: false
			};

			jest.spyOn(groupsStorage, 'create').mockImplementation(async () => await resultId);

			expect(await controller.create(createGroupDto)).toBe(resultId);
		});
	});

	describe('getAll handler', () => {
		it('returns groups', () => {

			const expectedGroups = testGroups;
			jest.spyOn(groupsStorage, 'getAll').mockImplementation(async () => await expectedGroups);

			const actualGroups = controller.getAll();

			expect(actualGroups).toEqual(expectedGroups);
		});
	});

	describe('get handler', () => {
		it('returns group', () => {

			const expectedGroup = testGroups[0];
			jest.spyOn(groupsStorage, 'get').mockImplementation(async () => await expectedGroup);

			const actualGroup = controller.get(String(0)); // groups no longer have ID

			expect(actualGroup).toEqual(expectedGroup);
		});
	});

	describe('batch update handler', () => {
		const ids = [0, 1];
		const newNameObject: UpdateGroupDto = {name: 'dummy'}

		console.log(typeof groupsStorage);

		jest.spyOn(groupsStorage, 'batchUpdate');

		controller.batchUpdate({ids, subDto: newNameObject});

		expect(groupsStorage.batchUpdate).toHaveBeenCalledWith({ids, subDto: newNameObject});
	});

	describe('update handler', () => {

		it('delegates group update to group service', () => {

			const groupToUpdateId = '0';
			const newNameObject: UpdateGroupDto = {name: 'dummy'}
			jest.spyOn(groupsStorage, 'update');

			controller.update(groupToUpdateId, newNameObject);

			expect(groupsStorage.update).toHaveBeenCalledWith(Number(groupToUpdateId), newNameObject);
		});
	});

	describe('remove handler', () => {

		it('delegates group removal to group service', () => {

			const groupToRemoveId = '0';
			jest.spyOn(groupsStorage, 'delete');

			controller.remove(groupToRemoveId);

			expect(groupsStorage.delete).toHaveBeenCalledWith(Number(groupToRemoveId))
		});
	});
});
