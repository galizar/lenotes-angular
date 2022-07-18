import { of } from "rxjs";
import { NoteService } from "src/app/services";

import { testNotes } from 'src/assets/test';
import { Note } from 'src/app/model';

let notes: Note[] = testNotes;

export const noteServiceStub = {
	getAll: () => {
		return of(notes)
	},
	// unefficient, but it's just for testing purposes
	move: (id: number, toGroupId: number) => {
		let subject = notes.find(note => note.id === id);
		if (!subject) {
			console.log('note to move not found');
			return of();
		} 
		subject.groupId = toGroupId;
		notes = [ 
			subject,
			...notes.filter(n => n.id !== id)
		];	
		return of();
	}
} as NoteService;