import { Module } from '@nestjs/common';

import { GroupsService } from './services/groups.service';
import { GroupsController } from './groups.controller';
import { DomainObjectStorage, NaiveGroupsStorage } from '@lenotes-ng/data-storage';

@Module({
  controllers: [GroupsController],
  providers: [
		GroupsService,
		{
			provide: DomainObjectStorage,
			useValue: new NaiveGroupsStorage()
		}
		//NaiveGroupsStorage,
	]
})
export class GroupsModule {}
