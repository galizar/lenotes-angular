import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { Note, Group } from '@lenotes-ng/model';
import { AppStateService } from '../services';
import { GroupStateService } from './services/group-state.service';
import { NoteStateService } from '../notes/services/note-state.service';
import { ConsoleLogger } from '@nestjs/common';
import { group } from 'console';

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
	multiselectElementsMap: Record<Group['id'], HTMLElement> = {};

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

	onClickGroupButton(event: MouseEvent, id: Group['id']) {
		if (event.ctrlKey || event.metaKey) {
			const target = event.target as HTMLElement;
			this.multiselectElementsMap[id] = target;
			target.classList.add('multiselect');
			target.focus();
		} else {
			this.appStateService.setGroupOnDisplayId(id);
		}
	}

	onBlurGroupButton(event: FocusEvent) {
		const relatedTarget = event.relatedTarget as HTMLElement;

		if (relatedTarget &&
				(relatedTarget.classList.contains('group-button') || relatedTarget.classList.contains('ctx-menu'))
			) {
			} else if (this.multiselectElements.length > 0) {
				this.clearSelectedElements();
			}
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

	showCtxMenu(
		event: MouseEvent, 
		ctxMenu: HTMLDivElement,
		trashDeleteButton: HTMLButtonElement
	)	{
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

		this.clearCtxMenu(ctxMenu, displayingTrash, trashDeleteButton);
	}

	clearCtxMenu(
		ctxMenu: HTMLDivElement,
		displayingTrash: boolean,
		trashDeleteButton: HTMLButtonElement,
	) {
		ctxMenu.style.display = 'none';

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

	handleTrashOrDelete(
		ctxMenu: HTMLDivElement, 
		id: Group['id'], 
		displayingTrash: boolean, 
		trashDeleteButton: HTMLButtonElement
	) {
		if (this.multiselectElements.length > 0) {
			let ids: Group['id'][] = [];

			for (const el of this.multiselectElements) {
				const id = Number(el.getAttribute('data-group-id'));
				ids.push(id);
			}
			this.multiTrashOrDelete(ids, displayingTrash);
		} else {
			this.trashOrDelete(ctxMenu, id, displayingTrash);
		}
		this.clearCtxMenu(ctxMenu, displayingTrash, trashDeleteButton);
	}

	trashOrDelete(
		ctxMenu: HTMLDivElement, 
		id: Group['id'],
		displayingTrash: boolean
	) {
		// remove ctx menu 
		ctxMenu.style.display = 'none';

		if (displayingTrash) {
			if (confirm('Are you sure you want to delete this group? This will delete all notes within too')) {
				this.groupStateService.delete(id);
			}
		} else {
			if (confirm('Are you sure you want to trash this group? This will trash all notes within too')) {
				this.groupStateService.update(id, {isTrashed: true});
				this.noteStateService.trashInGroups([id]);
			}
		}
	}

	multiTrashOrDelete(
		ids: Group['id'][],
		displayingTrash: boolean
	) {
		if (displayingTrash) {
			if (confirm('Are you sure you want to delete the selected groups? \
				This will delete all notes in those groups.')
			) {
				this.groupStateService.batchDelete(ids);
			}
		} else {
			if (confirm('Are you sure you want to trash the selected groups? \
				This will trash all notes in those groups')
			) {
				this.groupStateService.batchUpdate(ids, {isTrashed: true});
				this.noteStateService.trashInGroups(ids);
			}
		}
	}

	handleRestore(id: Group['id'], ctxMenu: HTMLDivElement) {
		ctxMenu.style.display = 'none';
		if (this.multiselectElements.length > 0) {
			const ids: Group['id'][] = [];

			for (const el of this.multiselectElements) {
				const id = Number(el.getAttribute('data-group-id'));
				ids.push(id);
			}
			this.groupStateService.batchUpdate(ids, {isTrashed: false});
			this.noteStateService.restoreInGroups(ids);
		} else {
			this.groupStateService.update(id, {isTrashed: false})
			this.noteStateService.restoreInGroups([id]);
		}
	}
}
