import { Module } from '@nestjs/common';

import { GroupsService } from './services/groups.service';
import { GroupsController } from './groups.controller';
import { NaiveGroupsStorage } from '@lenotes-ng/data-storage';

@Module({
  controllers: [GroupsController],
  providers: [
		GroupsService,
		NaiveGroupsStorage,
	]
})
export class GroupsModule {}
