import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { NoteService, AppStateService } from '../../services';

import { Note } from '@lenotes-ng/shared-model';
import { NoteStateService } from './note-state.service';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

	// view model
	vm$ = combineLatest(
		[
			this.appStateService.groupOnDisplayId$,
			this.appStateService.noteOnDisplayId$,
			this.noteStateService.notes$
		]
	).pipe(
		map(([groupOnDisplayId, noteOnDisplayId, notes]) => {
			return {groupOnDisplayId, noteOnDisplayId, notes};
		})
	);

  constructor(
		public appStateService: AppStateService,
		public noteStateService: NoteStateService) { 
	}

  ngOnInit(): void {
	}

	drag(event: DragEvent, note: Note): void {
		event.dataTransfer?.setData('Note', JSON.stringify(note));
	}
}
