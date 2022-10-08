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
	idAttributeName = 'data-note-id';
	nameFormValue = '';
	isFormHidden = true;
	multiselectElementsMap: Record<Note['id'], HTMLElement> = {};

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

	get multiselectElements() {
		return Object.values(this.multiselectElementsMap);
	}

	clearSelectedElements() {
		const elements = this.multiselectElements;

		if (elements.length > 0) {
			for (const el of elements) {
				el.classList.remove('multiselect');
			}
			this.multiselectElementsMap = {};
		}
	}

	onClickNoteButton(event: MouseEvent, id: Note['id']) {
		if (event.ctrlKey || event.metaKey) {
			const target = event.target as HTMLElement;
			this.multiselectElementsMap[id] = target;
			target.classList.add('multiselect');
			target.focus();
		} else {
			this.appStateService.setNoteOnDisplayId(id);
		}
	}

	onBlurNoteButton(event: FocusEvent) {
		const relatedTarget = event.relatedTarget as HTMLElement;

		if (
			relatedTarget && 
			(relatedTarget.classList.contains('note-button') || relatedTarget.classList.contains('ctx-menu'))
		) {
			// do nothing. either selecting more buttons or opened context menu to do
			// a multiselect operation
		} else if (this.multiselectElements.length > 0) {
			this.clearSelectedElements();
		}
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

	showCtxMenu(
		event: MouseEvent, 
		ctxMenu: HTMLDivElement, 
		trashDeleteButton: HTMLButtonElement
	) {
		event.preventDefault();
		const multiselectElements = this.multiselectElements; 
		const trashDeleteButtonText = trashDeleteButton.innerText;
		ctxMenu.style.display = 'flex';
		ctxMenu.style.position = 'fixed';

		trashDeleteButton.innerText = multiselectElements.length > 0 ? 
			`${trashDeleteButtonText} (${multiselectElements.length} selected)` : 
			trashDeleteButtonText;

		ctxMenu.style.left = `${event.clientX}px`;
		ctxMenu.style.top = `${event.clientY}px`;
		ctxMenu.focus();
	}

	onBlurCtxMenu(
		event: FocusEvent, 
		ctxMenu: HTMLDivElement, 
		displayingTrash: boolean,
		trashDeleteButton: HTMLButtonElement
	) {
		const relatedTarget = event.relatedTarget as HTMLElement;
		// prevent blur when clicking on the ctx menu items
		if (relatedTarget && relatedTarget.className === 'ctx-menu-item') return;

		this.clearCtxMenu(ctxMenu, trashDeleteButton, displayingTrash);
	}

	clearCtxMenu(
		ctxMenu: HTMLDivElement, 
		trashDeleteButton: HTMLButtonElement,
		displayingTrash: boolean, 
	) {
		ctxMenu.style.display = 'none';
		// reset trash/delete button text
		if (!displayingTrash) {
			trashDeleteButton.innerText = 'Move to Trash';
		} else {
			trashDeleteButton.innerText = 'Delete permanently';
		}
		this.clearSelectedElements();
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

	handleTrashOrDelete(
		ctxMenu: HTMLDivElement,
		id: Note['id'],
		displayingTrash: boolean,
		trashDeleteButton: HTMLButtonElement
	) {
		if (this.multiselectElements.length > 0) {
			let ids: Note['id'][] = [];

			for (const el of this.multiselectElements) {
				const id = Number(el.getAttribute('data-note-id'));
				ids.push(id);
			}
			this.multiTrashOrDelete(ids, displayingTrash);
		} else {
			this.trashOrDelete(id, displayingTrash);
		}
		this.clearCtxMenu(ctxMenu, trashDeleteButton, displayingTrash);
	}

	trashOrDelete(
		id: Note['id'],
		displayingTrash: boolean
	) {
		if (displayingTrash) {
			if (confirm('Are you sure you want to delete this note?')) {
				this.noteStateService.delete(id);
			}
		} else {
			if (confirm('Are you sure you want to trash this note?')) {
				this.noteStateService.update(id, {isTrashed: true});
			}
		}
	}

	multiTrashOrDelete(
		ids: Note['id'][],
		displayingTrash: boolean
	) {
		if (displayingTrash) {
			if (confirm('Are you sure you want to delete the selected notes?')) {
				this.noteStateService.batchDelete(ids)
			}
		} else {
			if (confirm('Are you sure you want to trash the selected notes?')) {
				this.noteStateService.batchUpdate(ids, {isTrashed: true});
			}
		}
	}

	handleRestore(id: Note['id'], ctxMenu: HTMLDivElement) {
		ctxMenu.style.display = 'none';
		if (this.multiselectElements.length > 0) {
			let ids: Note['id'][] = [];
			for (const el of this.multiselectElements) {
				const id = Number(el.getAttribute('data-note-id'));
				ids.push(id);
			}
			this.noteStateService.batchUpdate(ids, {isTrashed: false});
		} else {
			this.noteStateService.update(id, {isTrashed: false});
		}
	}
}
