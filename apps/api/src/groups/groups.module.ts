import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { GroupsService } from './services/groups.service';
import { GroupsController } from './groups.controller';
import { 
	DomainObjectStorage, 
	SupabaseGroupsStorage 
} from '@lenotes-ng/data-storage';
import auth from '../middleware/auth';

@Module({
  controllers: [GroupsController],
  providers: [
		GroupsService,
		{
			provide: DomainObjectStorage,
			useValue: new SupabaseGroupsStorage() 
		}
	]
})
export class GroupsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
		.apply(cookieParser(), auth)
		.forRoutes(GroupsController);
	}
}
