import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, map, distinctUntilChanged } from 'rxjs/operators';

import { Note } from '@lenotes-ng/model';
import { AppStateService } from '../../services';
import { NoteService } from './note.service';

interface NoteState {
	notes: Note[],
	noteOnDisplay?: Note
}

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {

	private state: NoteState = {
		notes: [],
		noteOnDisplay: undefined
	}

	private store = new BehaviorSubject<NoteState>(this.state);
	private state$ = this.store.asObservable();

  constructor(
		private noteService: NoteService,
		private appStateService: AppStateService
	) { 
		
		/** Register observer for update of note state when group on display changes */
		appStateService.groupOnDisplayId$.pipe(
			switchMap(groupOnDisplayId => {
				if (groupOnDisplayId === undefined) // only happens on initialization
					return of([]);
				else
					return noteService.getInGroup(groupOnDisplayId);
			})
		).subscribe(notes => {
			this.setNotes(notes.filter(n => !n.isTrashed));
		});

	}

	notes$ = this.state$.pipe(
		map(state => state.notes),
		distinctUntilChanged()
	);

	get(id: number) {
		return this.state.notes.find(n => n.id === id);
	}

	setNoteContent(id: number, content: string) {

		this.setNotes(
			this.state.notes.map(note => {
				if (note.id === id) {
					note.content = content;
				}
				return note;
			})
		);

		this.noteService.update(id, {content});
	}

	setNotes(notes: Note[]) {
		this.updateState({ ...this.state, notes });
	}

	move(id: number, toGroupId: number) {

		this.setNotes(
			this.state.notes.map(note => {
				if (note.id === id) {
					note.groupId = toGroupId;
				}
				return note;
			})
		);

		this.noteService.update(id, {groupId: toGroupId});
	}

	private updateState(state: NoteState) {
		this.store.next((this.state = state));
	}
}
