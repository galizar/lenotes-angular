import { Injectable } from '@nestjs/common';

import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Note } from '@lenotes-ng/shared/model';
import { testNotes } from '@lenotes-ng/shared/assets';

@Injectable()
export class NotesService {

	private notes: Note[] = (() => {
		return testNotes;
	})();

	private idPk = testNotes.reduce((prev, curr) => {
		if (prev.id > curr.id)
			return prev;
		else
			return curr;
	}).id;

  create(createNoteDto: CreateNoteDto): Note {

		this.idPk++;

		const newNote = {
			...createNoteDto,
			id: (() => this.idPk)()
		};

		this.notes.push(newNote);
    return newNote;
  }

  getAll(): Note[] {
		return this.notes;
  }

  get(id: number): Note {
		const note = this.notes.find(note => note.id === id);
		if (note === undefined) throw Error('Note not found');
		return note;
  }

	getInGroup(groupId: number): Note[] {
		return testNotes.filter(note => note.groupId === groupId);
	}

	update(id: number, dto: UpdateNoteDto) {

		const noteToUpdate = this.get(id);
		const updatedNote = {...noteToUpdate, ...dto};

		this.notes = this.notes.map(note => {
			if (note.id === id) {
				return updatedNote;
			}
			return note;
		}) 
	}

	remove(id: number): void {

		this.get(id); // throw error if note doesn't exist

		this.notes = this.notes.filter(n => n.id !== id);
	}
}
