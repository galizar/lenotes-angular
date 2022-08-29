import { throwError, of } from 'rxjs';

import { Note, Group, testNotes, ObjectMap } from '@lenotes-ng/model';
import { NoteService } from '../../app/notes/services/note.service';
import { INoteService } from '../../app/interfaces';
import { CreateNoteDto, UpdateNoteDto } from '@lenotes-ng/api-behavior';

export const noteServiceStubBuilder = {
	build: () => {

		let notes: ObjectMap<Note> = testNotes; // state initialization

		let idPk = Number(Object.keys(testNotes).reduce((a, b) => {
			if (a > b)
				return a;
			else
				return b;
		})[0]);

		const noteServiceStub: INoteService = {
			create: (withProps: CreateNoteDto) => {
				const id = ++idPk;
				notes[id] = withProps
				return of(id);
			},
			get: (id: Note['id']) => {
				const props = notes[id];
				if (props === undefined) {
					return throwError(() => { throw Error('Not found') });
				}
				return of(props);
			},
			getAll: () => {
				return of(notes);
			},
			getInGroup: (groupId: Group['id']) => {
				const notesInGroup = Object.values(notes).filter(props => props.groupId === groupId);
				return of(notesInGroup);
			},
			update: (id: Note['id'], dto: UpdateNoteDto) => {
				notes[id] = {...notes[id], ...dto};
				return of({});
			},
			batchUpdate: (ids: Note['id'][], dto: UpdateNoteDto) => {
				for (const id of ids) {
					for (let prop of Object.keys(dto) as Array<keyof UpdateNoteDto>) {
						notes[id][prop] = dto[prop];
					};
				}
				return of({});
			},
			delete: (id: Note['id']) => {
				delete notes[id];
				return of({});
			}
		}
		return noteServiceStub as NoteService;
	}
}