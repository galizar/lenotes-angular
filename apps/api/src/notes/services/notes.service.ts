import { Injectable } from '@nestjs/common';

import { ApiNotesService } from '@lenotes-ng/api-behavior';
import { NotesStorage } from '@lenotes-ng/data-storage';

@Injectable()
export class NotesService extends ApiNotesService {

	constructor(
		storage: NotesStorage 
	) {
		super(storage);
	}
}
