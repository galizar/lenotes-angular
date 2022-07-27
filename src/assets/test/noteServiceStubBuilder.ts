import { of, throwError } from "rxjs";


import { testNotes } from 'src/assets/test';
import { Note } from 'src/app/model';
import { NoteService } from 'src/app/services';

export const noteServiceStubBuilder = {
	build: () => {
		let notes: Note[] = testNotes; // state initialization

		const noteServiceStub = {
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
		} as NoteService;

		return noteServiceStub;
	}
}

//export class NoteServiceStub implements INoteService {
//
//	private notes: Note[]; 
//
//	constructor() {
//		this.notes = testNotes;
//	}
//
//	get(id: number) {
//		const note = this.notes.find(n => n.id === id);
//		if (note === undefined) {
//			return throwError('Not Found');
//		}
//		return of(note);
//	}
//
//	getInGroup(groupId: number) {
//		const notesInGroup = this.notes.filter(note => note.groupId === groupId);
//		return of(notesInGroup);
//	}
//
//	move(id: number, toGroupId: number) {
//		let subject: Note | undefined;
//		this.notes = this.notes.map((note) => {
//			if (note.id === id) {
//				note.groupId = toGroupId;
//				subject = note;
//			}
//			return note;
//		})
//		if (!subject) {
//			return throwError('note to move not found');
//		} 
//		return of(subject);
//	}
//}