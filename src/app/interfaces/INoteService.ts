import { Observable } from 'rxjs';

import { Note } from 'src/app/model';

export interface INoteService {
	get(id: number): Observable<Note>;
	getInGroup(groupId: number): Observable<Note[]>;
	move(id: number, toGroupId: number): Observable<Note>;
}