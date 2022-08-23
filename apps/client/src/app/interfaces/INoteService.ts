import { Observable } from 'rxjs';

import { NoteProps, NoteMap, Note } from '@lenotes-ng/model';
import { CreateNoteDto, UpdateNoteDto } from '@lenotes-ng/api-behavior';

export interface INoteService {
	get(id: Note['id']): Observable<NoteProps>;
	/** Returns id of created note */
	create(dto: CreateNoteDto): Observable<Note['id']>;
	getInGroup(groupId: Note['id']): Observable<NoteMap>;
	getAll(): Observable<NoteMap>;
	update(id: Note['id'], dto: UpdateNoteDto): Observable<object>;
	delete(id: Note['id']): Observable<object>;
}