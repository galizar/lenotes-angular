import { of, throwError } from "rxjs";

import { NoteService } from "../../app/services"; 
import { INoteService } from "../../app/interfaces";
import { Note } from "@lenotes-ng/model";
import { CreateNoteDto, UpdateNoteDto, ApiNotesService } from "@lenotes-ng/api-behavior";
import { DomainObjectStorage, NaiveNotesStorage } from '@lenotes-ng/data-storage';

export const noteServiceStubBuilder = {
	build: () => {

		const storage: DomainObjectStorage<Note> = new NaiveNotesStorage();
		const apiService = new ApiNotesService(storage);

		const noteServiceStub: INoteService = {
			create: (dto: CreateNoteDto) => {

				const idOfNewNote = apiService.create(dto);
				return of(idOfNewNote);
			},
			get: (id: number) => {
				try {
					const note = apiService.get(id);
					return of(note);
				} catch (e) {
					return throwError(() => { new Error('Error while getting note'); });
				}
			},
			getAll: () => {
				return of(apiService.getAll());
			},
			getInGroup: (groupId: number) => {
				const notesInGroup = apiService.getInGroup(groupId);
				return of(notesInGroup);
			},
			update: (id: number, dto: UpdateNoteDto) => {
				try {
					apiService.update(id, dto);
					return of({}); // stub object. in practice, this object will be an http response
				} catch (e) {
					return throwError(() => { new Error('Error while updating note'); });
				}
			},
			delete: (id: number) => {
				try {
					apiService.delete(id);
					return of({});
				} catch (e) {
					return throwError(() => { new Error('Error while updating note'); });
				}
			}
		};
		return noteServiceStub as NoteService;
	}
}