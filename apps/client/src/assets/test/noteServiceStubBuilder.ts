import { of, throwError } from "rxjs";

import { testNotes } from "@lenotes-ng/shared/assets";
import { Note } from "@lenotes-ng/shared/model";
import { NoteService } from "../../app/services"; 
import { INoteService } from "../../app/interfaces";

export const noteServiceStubBuilder = {
	build: () => {
		let notes: Note[] = testNotes; // state initialization

		const noteServiceStub: INoteService = {
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
			},
			setContent: (id: number, content: string) => {
				let subject = notes.find(note => note.id === id);
				if (!subject) {
					return throwError('note to set content to not found');
				}
				notes = notes.map((note) => {
					if (note.id === id) {
						note.content = content;
						subject = note;
					}
					return note;
				})
				return of(subject);
			}
		};

		return noteServiceStub as NoteService;
	}
}