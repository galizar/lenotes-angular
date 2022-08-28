import { Observable } from 'rxjs';

import { ObjectMap, Note } from '@lenotes-ng/model';
import { CreateNoteDto, UpdateNoteDto } from '@lenotes-ng/api-behavior';

export interface INoteService {
	get(id: Note['id']): Observable<Note['props']>;
	/** Returns id of created note */
	create(dto: CreateNoteDto): Observable<Note['id']>;
	getInGroup(groupId: Note['id']): Observable<ObjectMap<Note>>;
	getAll(): Observable<ObjectMap<Note>>;
	update(id: Note['id'], dto: UpdateNoteDto): Observable<object>;
	delete(id: Note['id']): Observable<object>;
}