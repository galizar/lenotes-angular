import { of, throwError } from "rxjs";
import { INoteService } from "src/app/interfaces";

import { testNotes } from 'src/assets/test';
import { Note } from 'src/app/model';

let notes: Note[] = testNotes;

export const noteServiceStub: INoteService = {
	get: (id: number) => {
		const note = notes.find(n => n.id === id);
		if (note === undefined) {
			return throwError('Not Found');
		}
		return of(note);
	},
	getInGroup: (groupId: number) => {
		const notesInGroup = notes.filter(note => note.groupId === groupId);
		return of(notesInGroup);
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
};