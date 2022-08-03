import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, debounceTime, sample } from 'rxjs/operators';

import { AppStateService } from '../services';
import { NoteStateService } from '../components/notes-display/note-state.service';
import { EditorStateService } from './editor-state.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

	content = new FormControl<string>('');

	// view model
	vm$ = combineLatest([
		this.editorStateService.contentToDisplay$
	]).pipe(
		map(([contentToDisplay]) => {
			return {contentToDisplay};
		})
	);

  constructor(
		public appStateService: AppStateService,
		public noteStateService: NoteStateService,
		public editorStateService: EditorStateService
	) {
	}

  ngOnInit(): void {
		
		/** Register observer to listen for changes to the note on display  */
		combineLatest([
			this.content.valueChanges,
			this.appStateService.noteOnDisplayId$
		]).pipe(
			sample(this.content.valueChanges),
			debounceTime(500),
		).subscribe(([content, id]) => {
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
