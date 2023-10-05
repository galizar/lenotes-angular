import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { GroupsController } from './groups.controller';
import { 
	DomainObjectStorage, 
	SupabaseGroupsStorage,
	NaiveGroupsStorage
} from '@lenotes-ng/data-storage';
import auth from '../middleware/auth';

@Module({
  controllers: [GroupsController],
  providers: [
		{
			provide: DomainObjectStorage,
			useValue: new NaiveGroupsStorage()
		}
	]
})
export class GroupsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		// consumer
		// .apply(cookieParser(), auth)
		// .forRoutes(GroupsController);
	}
}
