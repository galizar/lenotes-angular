import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { NotesService } from './services/notes.service';
import { NotesController } from './notes.controller';
import { 
	DomainObjectStorage, 
	SupabaseNotesStorage,
} from '@lenotes-ng/data-storage';
import auth from '../middleware/auth';

@Module({
  controllers: [NotesController],
  providers: [
		NotesService, 
		{
			provide: DomainObjectStorage,
			useValue: new SupabaseNotesStorage() 
		}
	]
})
export class NotesModule implements NestModule {
	
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(cookieParser(), auth)
			.forRoutes(NotesController);
	}
}
