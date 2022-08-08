import { Injectable } from '@nestjs/common';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from '@lenotes-ng/shared/model';
import { testNotes } from '@lenotes-ng/shared/assets';

@Injectable()
export class NotesService {

  create(createNoteDto: CreateNoteDto): Note {
		throw Error('Not implemented');
  }

  getAll(): Note[] {
		return testNotes;
  }

  get(id: number): Note {
		const note = testNotes.find(note => note.id === id);
		if (note === undefined) throw Error('Note not found');
		return note;
  }

	getInGroup(groupId: number): Note[] {
		return testNotes.filter(note => note.groupId === groupId);
	}

	update(id: number, dto: UpdateNoteDto): Note {

		let subject: Note; // get note to update

		for (const [prop, value] of Object.entries(dto)) {

			if (prop === 'name') {

			}
			if (prop === 'groupId') {

			}
			if (prop === 'content') {

			}
			if (prop === 'isTrashed') {

			}
			throw Error(`${prop} is not a property of Note`);
		}
		throw Error('not implemented');
	}

	remove(id: number): void {
		throw Error('not implemented');
	}
}
