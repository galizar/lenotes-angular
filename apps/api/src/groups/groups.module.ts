import { Inject, Module } from '@nestjs/common';

import { GroupsService } from './services/groups.service';
import { GroupsController } from './groups.controller';
import { DomainObjectStorage, KyselyGroupsStorage } from '@lenotes-ng/data-storage';

@Module({
  controllers: [GroupsController],
  providers: [
		GroupsService,
		{
			provide: DomainObjectStorage,
			useValue: new KyselyGroupsStorage() 
		}
	]
})
export class GroupsModule {}
