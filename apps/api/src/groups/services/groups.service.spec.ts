import { Test, TestingModule } from '@nestjs/testing';

import { GroupsService } from './groups.service';
import { DomainObjectStorage, NaiveGroupsStorage } from '@lenotes-ng/data-storage';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
				GroupsService,
				{
					provide: DomainObjectStorage,
					useValue: new NaiveGroupsStorage()
				}
			],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
