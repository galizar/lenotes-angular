import { Injectable } from '@nestjs/common';

import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Note } from '@lenotes-ng/shared/model';
import { testNotes } from '@lenotes-ng/shared/assets';
import { DomainObjectStorage, NaiveNotesStorage } from '@lenotes-ng/data-storage';

@Injectable()
export class NotesService {

	constructor(
		private storage: NaiveNotesStorage
	) {}

  create(createNoteDto: CreateNoteDto) {

		const newNote = {
			...createNoteDto,
			id: -1
		};

		return this.storage.create(newNote);
  }

  getAll(): Note[] {
		return this.storage.getAll();
  }

  get(id: number): Note {
		return this.storage.get(id);
  }

	getInGroup(groupId: number): Note[] {
		return testNotes.filter(note => note.groupId === groupId);
	}

	update(id: number, dto: UpdateNoteDto) {

		const noteToUpdate = this.get(id);
		const updatedNote = {...noteToUpdate, ...dto};

		this.storage.update(updatedNote);
	}

	remove(id: number): void {

		this.storage.delete(id);
	}
}
