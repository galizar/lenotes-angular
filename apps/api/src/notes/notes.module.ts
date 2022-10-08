import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { NotesService } from './services/notes.service';
import { NotesController } from './notes.controller';
import { 
	NotesStorage,
	SupabaseNotesStorage,
	NaiveNotesStorage
} from '@lenotes-ng/data-storage';
import auth from '../middleware/auth';

@Module({
  controllers: [NotesController],
  providers: [
		NotesService, 
		{
			provide: NotesStorage,
			useValue: new NaiveNotesStorage() 
		}
	]
})
export class NotesModule { // implements NestModule
	
	//configure(consumer: MiddlewareConsumer) {
	//	consumer
	//		.apply(cookieParser(), auth)
	//		.forRoutes(NotesController);
	//}
}
