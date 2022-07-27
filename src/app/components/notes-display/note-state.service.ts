import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { Note } from 'src/app/model';
import { AppStateService, NoteService } from 'src/app/services';

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {

	private notes: Note[] = [];
	private store = new BehaviorSubject<Note[]>(this.notes);
	public notes$ = this.store.asObservable();

  constructor(
		private noteService: NoteService,
		private appStateService: AppStateService
	) { 
		
		/** Register observer for update of note state when group on display changes */
		appStateService.groupOnDisplayId$.pipe(
			mergeMap(groupOnDisplayId => {
				if (groupOnDisplayId === undefined)
					return of([]);
				else
					return noteService.getInGroup(groupOnDisplayId);
			})
		).subscribe(notes => {
			this.setNotes(notes.filter(n => !n.isTrashed));
		});
	}

	setNotes(notes: Note[]) {
		this.store.next((this.notes = notes));
	}

	move(id: number, toGroupId: number) {

		this.setNotes(
			this.notes.map(note => {
				if (note.id === id) {
					note.groupId = toGroupId;
				}
				return note;
			})
		);

		this.noteService.move(id, toGroupId);
	}
}
