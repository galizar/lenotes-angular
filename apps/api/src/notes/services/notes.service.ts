import { Injectable } from '@nestjs/common';

import { ApiNotesService } from '@lenotes-ng/api-behavior';
import { Note } from '@lenotes-ng/model';
import { DomainObjectStorage } from '@lenotes-ng/data-storage';

@Injectable()
export class NotesService extends ApiNotesService {

	constructor(
		storage: DomainObjectStorage<Note>
	) {
		super(storage);
	}
}
