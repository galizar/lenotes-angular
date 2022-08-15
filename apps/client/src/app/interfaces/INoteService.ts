import { Observable } from 'rxjs';

import { Note } from '@lenotes-ng/model';
import { CreateNoteDto, UpdateNoteDto } from '@lenotes-ng/api-behavior';

export interface INoteService {
	get(id: number): Observable<Note>;
	/** Returns id of created note */
	create(dto: CreateNoteDto): Observable<number>;
	getInGroup(groupId: number): Observable<Note[]>;
	getAll(): Observable<Note[]>;
	update(id: number, dto: UpdateNoteDto): Observable<object>;
	delete(id: number): Observable<object>;
}