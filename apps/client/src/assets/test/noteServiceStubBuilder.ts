import { of, throwError } from "rxjs";

import { Note } from "@lenotes-ng/shared/model";
import { NoteService } from "../../app/services"; 
import { INoteService } from "../../app/interfaces";
import { CreateNoteDto, UpdateDto } from "../../app/dto";
import { DomainObjectStorage, NaiveNotesStorage } from '@lenotes-ng/data-storage';

export const noteServiceStubBuilder = {
	build: () => {

		const storage: DomainObjectStorage<Note> = new NaiveNotesStorage();

		const noteServiceStub: INoteService = {
			create: (dto: CreateNoteDto) => {

				const newNote = {
					...dto,
					id: -1 // dummy id, id will be set by data storage system
				};

				return of(storage.create(newNote));
			},
			get: (id: number) => {
				try {
					const note = storage.get(id);
					return of(note);
				} catch (e) {
					return throwError(() => {new Error('Error while getting note')});
				}
			},
			getInGroup: (groupId: number) => {
				const notesInGroup = storage.getAll().filter(note => note.groupId === groupId);
				return of(notesInGroup);
			},
			update: (id: number, dto: UpdateDto<Note>) => {
				try {
					let noteToUpdate = storage.get(id);
					const updatedNote = { ...noteToUpdate, ...dto};
					storage.update(updatedNote);
					return of({}); // stub object. in practice, this object will be an http response
				} catch (e) {
					return throwError(() => { new Error('Error while updating note') });
				}
			},
		};
		return noteServiceStub as NoteService;
	}
}