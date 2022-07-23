import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Note } from 'src/app/model';
import { AppStateService, NoteService } from 'src/app/services';

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {

	private store = new BehaviorSubject<Note[]>([]);

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

	public notes$ = this.store.asObservable();

	setNotes(notes: Note[]) {
		this.store.next(notes);
	}
}
