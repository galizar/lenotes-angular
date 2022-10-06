import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { Note, Group } from '@lenotes-ng/model';
import { AppStateService } from '../services';
import { GroupStateService } from './services/group-state.service';
import { NoteStateService } from '../notes/services/note-state.service';
import { ConsoleLogger } from '@nestjs/common';

@Component({
  selector: 'app-groups-display',
  templateUrl: './groups-display.component.html',
  styleUrls: ['./groups-display.component.css']
})
export class GroupsDisplayComponent implements OnInit {

	createFormId = 'create-group-form';
	createFormInputId = 'group-name-input';
	createFormInputValue: string = '';
	isCreateFormHidden = true;

	vm$ = combineLatest({
		groupOnDisplayId: this.appStateService.groupOnDisplayId$,
		groups: this.groupStateService.groups$,
		displayingTrash: this.appStateService.displayingTrash$
	});

  constructor(
		public noteStateService: NoteStateService,
		public appStateService: AppStateService,
		public groupStateService: GroupStateService) { }

  ngOnInit(): void {
  }

	dropOnGroup(event: DragEvent, groupId: number): void {

		event.preventDefault();
		const stringifiedNote = event.dataTransfer?.getData('Note');
		if (!stringifiedNote) throw Error('stringified note not extracted correctly');

		const note = JSON.parse(stringifiedNote) as Note;
		const id = Object.keys(note)[0];
 
		this.noteStateService.move(+id, groupId);
	}

	allowDrop(event: DragEvent): void {
		event?.preventDefault();
	}

	drag(event: DragEvent, group: Group) {
		event.dataTransfer?.setData('Group', JSON.stringify(group));
	}

	onSubmitCreate() {
		this.isCreateFormHidden = true;
		this.groupStateService.create(this.createFormInputValue);
		this.createFormInputValue = '';
	}

	toggleFormVisibility(input: HTMLInputElement) {

		if (this.isCreateFormHidden) {
			this.isCreateFormHidden = false;

			// input element is not visible immediately. schedule focus to another macrotask 
			setTimeout(() => input.focus()); 
		} else {
			this.isCreateFormHidden = true;
		}
	}

	showCtxMenu(event: MouseEvent, ctxMenu: HTMLDivElement)	{
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

	onSubmitRename(id: Group['id'], form: HTMLFormElement, input: HTMLInputElement) {
		if (input.checkValidity()) {
			form.style.display = 'none';
			this.groupStateService.update(id, {name: input.value});
		}
	}

	onBlurCreateInput(event: FocusEvent) {
		this.isCreateFormHidden = true;
		this.createFormInputValue = '';
	}

	trashOrDelete(
		ctxMenu: HTMLDivElement, 
		id: Group['id'],
		displayingTrash: boolean
	) {
		// remove ctx menu 
		ctxMenu.style.display = 'none';

		if (displayingTrash) {
			this.delete(id);
		} else {
			if (confirm('Are you sure you want to trash this group? This will trash all notes within too')) {
				this.groupStateService.trash(id);
				this.noteStateService.trashInGroup(id);
			}
		}
	}

	delete(id: Group['id']) {
		if (confirm('Are you sure you want to delete this group? This will delete all notes within too')) {
			this.groupStateService.delete(id);
			this.noteStateService.deleteInGroup(id);
		}
	}
}
