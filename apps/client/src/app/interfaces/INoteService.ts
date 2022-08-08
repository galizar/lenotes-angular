import { Observable } from 'rxjs';

import { Note } from '@lenotes-ng/shared-model';

export interface INoteService {
	get(id: number): Observable<Note>;
	getInGroup(groupId: number): Observable<Note[]>;
	move(id: number, toGroupId: number): Observable<Note>;
	setContent(id: number, content: string): Observable<Note>;
}