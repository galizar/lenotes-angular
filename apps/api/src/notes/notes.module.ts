import { Module } from '@nestjs/common';

import { NotesService } from './services/notes.service';
import { NotesController } from './notes.controller';
import { DomainObjectStorage, KyselyNotesStorage } from '@lenotes-ng/data-storage';

@Module({
  controllers: [NotesController],
  providers: [
		NotesService, 
		{
			provide: DomainObjectStorage,
			useValue: new KyselyNotesStorage() 
		}
	]
})
export class NotesModule {}
