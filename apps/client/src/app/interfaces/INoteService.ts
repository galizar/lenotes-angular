import { Observable } from 'rxjs';

import { Note } from '@lenotes-ng/shared/model';
import { CreateNoteDto, UpdateDto } from '../dto';

export interface INoteService {
	get(id: number): Observable<Note>;
	/** Returns id of created note */
	create(dto: CreateNoteDto): Observable<number>;
	getInGroup(groupId: number): Observable<Note[]>;
	update(id: number, dto: UpdateDto<Note>): Observable<object>;
}