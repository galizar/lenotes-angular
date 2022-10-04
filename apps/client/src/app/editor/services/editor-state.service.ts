import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppStateService } from '../../services';
import { NoteStateService } from '../../notes/services/note-state.service';

interface EditorState {
	contentToDisplay: string,
	nameToDisplay: string
}

@Injectable({
  providedIn: 'root'
})
export class EditorStateService {

	private state: EditorState = {
		contentToDisplay: '',
		nameToDisplay: ''
	}

	private store = new BehaviorSubject<EditorState>(this.state);
	private state$ = this.store.asObservable();
	
  constructor(
		public appStateService: AppStateService,
		public noteStateService: NoteStateService
	) { 

		/** Register observer to listen for changes on the content to display */
		appStateService.noteOnDisplayId$.subscribe(id => {
			if (id === undefined) {
				this.updateState({contentToDisplay: '', nameToDisplay: ''})
			} else {
				const note = noteStateService.get(id);
				this.updateState({
					contentToDisplay: note.content,
					nameToDisplay: note.name
				});
			} 
		});
	}

	contentToDisplay$ = this.state$.pipe(
		map(state => state.contentToDisplay)
	);

	nameToDisplay$ = this.state$.pipe(
		map(state => state.nameToDisplay)
	);

	updateState(state: Partial<EditorState>) {
		this.store.next((this.state = {...this.state, ...state}));
	}
}
