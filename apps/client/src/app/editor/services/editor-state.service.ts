import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppStateService } from '../../services';
import { NoteStateService } from '../../notes/services/note-state.service';

interface EditorState {
	contentToDisplay: string
}

@Injectable({
  providedIn: 'root'
})
export class EditorStateService {

	private state: EditorState = {
		contentToDisplay: ''
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
				this.setContentToDisplay('');
			} else {
				const note = noteStateService.get(id);
				if (note === undefined) return;
				this.setContentToDisplay(note.content);
			} 
		});
	}

	contentToDisplay$ = this.state$.pipe(
		map(state => state.contentToDisplay)
	)

	setContentToDisplay(content: string) {
		this.updateState({ ...this.state, contentToDisplay: content});
	}

	updateState(state: EditorState) {
		this.store.next((this.state = state));
	}
}
