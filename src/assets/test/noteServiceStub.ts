import { of, throwError } from "rxjs";
import { NoteService } from "src/app/services";

import { testNotes } from 'src/assets/test';
import { Note } from 'src/app/model';

let notes: Note[] = testNotes;

export const noteServiceStub = {
	get: (id: number) => {
		return of(notes.find(n => n.id === id));
	},
	getAll: () => {
		return of(notes)
	},
	move: (id: number, toGroupId: number) => {
		let subject = notes.find(note => note.id === id);
		if (!subject) {
			return throwError('note to move not found');
		} 
		notes = notes.map((note) => {
			if (note.id === id) {
				note.groupId = toGroupId;
			}
			return note;
		})
		return of();
	}
} as NoteService;