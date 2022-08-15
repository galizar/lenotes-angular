import { Injectable } from '@nestjs/common';

import { CreateNoteDto, UpdateNoteDto } from '@lenotes-ng/api-interfaces';
import { Note } from '@lenotes-ng/model';
import { DomainObjectStorage } from '@lenotes-ng/data-storage';

@Injectable()
export class NotesService {

	constructor(
		private storage: DomainObjectStorage<Note>
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
		return this.storage.getAll().filter(note => note.groupId === groupId);
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
