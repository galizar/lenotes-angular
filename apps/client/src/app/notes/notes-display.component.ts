import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { AppStateService } from '../services';
import { Note, NoteMap } from '@lenotes-ng/model';
import { NoteStateService } from './services/note-state.service';
import { buildViewModel } from '../util/buildViewModel';

type NotesViewModel = {
	groupOnDisplayId?: number,
	noteOnDisplayId?: number,
	notes: NoteMap,
	displayingTrash: boolean
};

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

	createNoteFormId = 'create-note-form';
	noteNameInputId = 'note-name-input';
	nameFormValue = '';
	objectKeys = Object.keys;

	// view model
	vm$ = buildViewModel<NotesViewModel>({
		groupOnDisplayId: this.appStateService.groupOnDisplayId$,
		noteOnDisplayId: this.appStateService.noteOnDisplayId$,
		displayingTrash: this.appStateService.displayingTrash$,
		notes: this.noteStateService.notes$
	});
		
  constructor(
		public appStateService: AppStateService,
		public noteStateService: NoteStateService) { 
	}

  ngOnInit(): void {
	}

	drag(event: DragEvent, note: Note): void {
		event.dataTransfer?.setData('Note', JSON.stringify(note));
	}

	onSubmitCreate(event: SubmitEvent, form: HTMLFormElement, groupId?: number) {

		event.preventDefault();
		form.style.display = '';

		this.noteStateService.create(this.nameFormValue, groupId);
		this.nameFormValue = '';
	}

	toggleFormVisibility(form: HTMLFormElement, input: HTMLInputElement) {

		if (form.style.display === '') {
			form.style.display = 'block';
			input.focus();
		} else {
			form.style.display = '';
		}
	}

	onInputBlur(form: HTMLFormElement) {

		form.style.display = '';
		this.nameFormValue = '';
	}

	trash(id: number) {

		if (confirm('Are you sure you want to trash this note'))
			this.noteStateService.trash(id);
	}
}
