import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, debounceTime, sample } from 'rxjs/operators';

import { AppStateService } from '../services';
import { NoteStateService } from '../notes/services/note-state.service';
import { EditorStateService } from './services/editor-state.service';
import { buildViewModel } from '../util/buildViewModel';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

	content = new FormControl<string>('');

	// view model
	vm$ = buildViewModel({
		contentToDisplay: this.editorStateService.contentToDisplay$,
		noteOnDisplayId: this.appStateService.noteOnDisplayId$,
		displayingTrash: this.appStateService.displayingTrash$
	});

  constructor(
		public appStateService: AppStateService,
		public noteStateService: NoteStateService,
		public editorStateService: EditorStateService
	) {
	}

  ngOnInit(): void {
		
		/** Register observer to listen for changes to the note on display  */
		combineLatest([
			this.appStateService.noteOnDisplayId$,
			this.content.valueChanges
		])
		.pipe(
			sample(this.content.valueChanges), // ignore emits where only noteOnDisplay changes
			debounceTime(500),
		).subscribe(([id]) => {
			const content = this.content.value;
			if (id === undefined || content === null) return;
			this.noteStateService.setNoteContent(id, content);
		});

		/** Register observer to display content of note when note on display changes */
		this.editorStateService.contentToDisplay$.pipe(
			sample(this.appStateService.noteOnDisplayId$)
		).subscribe(content => {
			this.content.setValue(content, {emitEvent: false});
		});
	 }
}
