import { Injectable } from '@nestjs/common';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

const testNotes: Note[] = [
	{id: 0, name: 'note 1', content: 'content 1', groupId: 0, isTrashed: false},
	{id: 1, name: 'note 2', content: 'content 2', groupId: 1, isTrashed: false},
	{id: 2, name: 'note 3', content: 'content 3', groupId: 2, isTrashed: false},
	{id: 3, name: 'note 4', content: 'content 4', groupId: 1, isTrashed: true},
	{id: 4, name: 'note 5', content: 'content 5', groupId: 0, isTrashed: true},
	{id: 5, name: 'note 6', content: 'content 6', groupId: 1, isTrashed: false},
	{id: 6, name: 'note 7', content: 'content 7', groupId: 1, isTrashed: true},
	{id: 7, name: 'note 8', content: 'content 8', groupId: 2, isTrashed: false},
	{id: 8, name: 'note 9', content: 'content 9', groupId: 2, isTrashed: true},
	{id: 9, name: 'note 10', content: 'content 10', groupId: 0, isTrashed: false},
]

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
