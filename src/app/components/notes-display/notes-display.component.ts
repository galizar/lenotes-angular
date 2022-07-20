import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { NoteService, AppStateService } from 'src/app/services';

import { Note } from '../../model';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

	// view model
	vm$ = combineLatest(
		[
			this.stateService.groupOnDisplayId$,
			this.stateService.noteOnDisplayId$
		]
	).pipe(
		map(([groupOnDisplayId, noteOnDisplayId]) => {
			return {groupOnDisplayId, noteOnDisplayId};
		})
	);

  notes: Note[] = [];

  constructor(
		public service: NoteService,
		public stateService: AppStateService) { 
	}

  ngOnInit(): void {
		this.service.getAll()
			.subscribe(notes => this.notes = notes);
  }

	//setNoteOnDisplayId(id: number): void {
	//	this.setNoteOnDisplayIdEvent.emit(id);
	//	console.log('triggered setNoteOnDisplayId');
	//}

	drag(event: DragEvent, note: Note): void {
		event.dataTransfer?.setData('Note', JSON.stringify(note));
	}
}
