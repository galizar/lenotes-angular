import { Module } from '@nestjs/common';

import { NotesService } from './services/notes.service';
import { NotesController } from './notes.controller';
import { Note } from '@lenotes-ng/shared/model';
import { DomainObjectStorage, NaiveNotesStorage } from '@lenotes-ng/data-storage';

@Module({
  controllers: [NotesController],
  providers: [
		NotesService, 
		NaiveNotesStorage
	]
})
export class NotesModule {}
