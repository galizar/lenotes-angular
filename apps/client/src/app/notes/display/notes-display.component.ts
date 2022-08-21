import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppStateService } from '../../services';

import { Note } from '@lenotes-ng/model';
import { NoteStateService } from '../services/note-state.service';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

	createNoteFormId = 'create-note-form';
	noteNameInputId = 'note-name-input';
	nameFormValue = '';

	// view model
	vm$ = combineLatest(
		[
			this.appStateService.groupOnDisplayId$,
			this.appStateService.noteOnDisplayId$,
			this.appStateService.displayingTrash$,
			this.noteStateService.notes$,
		]
	).pipe(
		map((props) => {
			return {
				groupOnDisplayId: props[0], 
				noteOnDisplayId: props[1], 
				displayingTrash: props[2],
				notes: props[3]
			};
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
