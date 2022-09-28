import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { AppStateService } from '../services';
import { Note } from '@lenotes-ng/model';
import { NoteStateService } from './services/note-state.service';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

	createNoteFormId = 'create-note-form';
	noteNameInputId = 'note-name-input';
	nameFormValue = '';
	isFormHidden = true;

	// view model
	vm$ = combineLatest({
		groupOnDisplayId: this.appStateService.groupOnDisplayId$,
		noteOnDisplayId: this.appStateService.noteOnDisplayId$,
		displayingTrash: this.appStateService.displayingTrash$,
		notes: this.noteStateService.notes$
	})

  constructor(
		public appStateService: AppStateService,
		public noteStateService: NoteStateService) { 
	}

  ngOnInit(): void {
	}

	drag(event: DragEvent, note: Note): void {
		event.dataTransfer?.setData('Note', JSON.stringify(note));
	}

	onSubmitCreate(groupId?: number) {

		this.isFormHidden = true;

		this.noteStateService.create(this.nameFormValue, groupId);
		this.nameFormValue = '';
	}

	toggleFormVisibility(input: HTMLInputElement) {

		if (this.isFormHidden) {
			this.isFormHidden = false;
			input.focus();
		} else {
			this.isFormHidden = true;
		}
	}

	onInputBlur(event: FocusEvent, submitButton: HTMLButtonElement) {

		const relatedTarget = event.relatedTarget as HTMLElement;
		if (
			relatedTarget && 
			(submitButton.getAttribute('id') === relatedTarget.getAttribute('id'))
		) {
			return; // ignore blur event; it's caused by click on submit button
		}
		this.isFormHidden = true;
		this.nameFormValue = '';
	}

	trash(id: number) {

		if (confirm('Are you sure you want to trash this note'))
			this.noteStateService.trash(id);
	}
}
