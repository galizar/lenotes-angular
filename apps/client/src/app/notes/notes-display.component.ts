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

			// input element is not visible immediately. schedule focus to another macrotask 
			setTimeout(() => input.focus()); 
		} else {
			this.isFormHidden = true;
		}
	}

	onBlurCreateInput(event: FocusEvent) {

		this.isFormHidden = true;
		this.nameFormValue = '';
	}

	showCtxMenu(event: MouseEvent, ctxMenu: HTMLDivElement) {
		event.preventDefault();
		ctxMenu.style.display = 'flex';
		ctxMenu.style.position = 'fixed';
		ctxMenu.style.left = `${event.clientX}px`;
		ctxMenu.style.top = `${event.clientY}px`;
		ctxMenu.focus();
	}

	onBlurCtxMenu(event: FocusEvent, ctxMenu: HTMLDivElement) {

		const relatedTarget = event.relatedTarget as HTMLElement;
		// prevent blur when clicking on the ctx menu items
		if (relatedTarget && relatedTarget.className === 'ctx-menu-item') return;

		ctxMenu.style.display = 'none';
	}

	showRenameInput(
		form: HTMLFormElement, 
		input: HTMLInputElement,
		button: HTMLButtonElement, 
		ctxMenu: HTMLDivElement
	) {
		ctxMenu.style.display = 'none';
		form.style.display = 'block';
		button.replaceWith(form);
		input.focus();
	}

	onBlurRenameInput(
		form: HTMLFormElement, 
		input: HTMLInputElement, 
		button: HTMLButtonElement
	) {
		form.style.display = 'none';
		input.value = '';
		form.replaceWith(button);
	}

	onSubmitRename(id: Note['id'], form: HTMLFormElement, input: HTMLInputElement) {
		if (input.checkValidity()) {
			form.style.display = 'none';
			this.noteStateService.update(id, {name: input.value});
		}
	}

	trashOrDelete(
		ctxMenu: HTMLDivElement, 
		id: Note['id'],
		displayingTrash: boolean
	) {
		// remove ctx menu 
		ctxMenu.style.display = 'none';

		if (displayingTrash) {
			this.delete(id);
		} else {
			if (confirm('Are you sure you want to trash this note?')) {
				this.noteStateService.trash(id);
			}
		}
	}

	delete(id: Note['id']) {
		if (confirm('Are you sure you want to delete this note?')) {
			this.noteStateService.delete(id);
		}
	}
}
