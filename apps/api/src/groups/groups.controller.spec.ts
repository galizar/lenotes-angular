import { Test, TestingModule } from '@nestjs/testing';

import { GroupsController } from './groups.controller';
import { GroupsService } from './services/groups.service';
import { testGroups } from '@lenotes-ng/model';
import { CreateGroupDto, UpdateGroupDto } from '@lenotes-ng/api-behavior';
import { DomainObjectStorage, NaiveGroupsStorage } from '@lenotes-ng/data-storage';

describe('GroupsController', () => {
  let controller: GroupsController;
	let groupsService: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
				GroupsService,
				{
					provide: DomainObjectStorage,
					useValue: new NaiveGroupsStorage()
				}
			],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
		groupsService = module.get<GroupsService>(GroupsService);

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

			jest.spyOn(groupsService, 'create').mockImplementation(() => resultId);

			expect(await controller.create(createGroupDto)).toBe(resultId);
		});
	});

	describe('getAll handler', () => {
		it('returns groups', () => {

			const expectedGroups = testGroups;
			jest.spyOn(groupsService, 'getAll').mockImplementation(() => expectedGroups);

			const actualGroups = controller.getAll();

			expect(actualGroups).toEqual(expectedGroups);
		});
	});

	describe('get handler', () => {
		it('returns group', () => {

			const expectedGroup = testGroups[0];
			jest.spyOn(groupsService, 'get').mockImplementation(() => expectedGroup);

			const actualGroup = controller.get(String(expectedGroup.id));

			expect(actualGroup).toEqual(expectedGroup);
		});
	});

	describe('update handler', () => {

		it('delegates group update to group service', () => {

			const groupToUpdateId = '0';
			const newNameObject: UpdateGroupDto = {name: 'dummy'}
			jest.spyOn(groupsService, 'update');

			controller.update(groupToUpdateId, newNameObject);

			expect(groupsService.update).toHaveBeenCalledWith(Number(groupToUpdateId), newNameObject);
		});
	});

	describe('remove handler', () => {

		it('delegates group removal to group service', () => {

			const groupToRemoveId = '0';
			jest.spyOn(groupsService, 'delete');

			controller.remove(groupToRemoveId);

			expect(groupsService.delete).toHaveBeenCalledWith(Number(groupToRemoveId))
		});
	});
});
