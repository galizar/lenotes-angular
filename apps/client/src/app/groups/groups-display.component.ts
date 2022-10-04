import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { Note, Group } from '@lenotes-ng/model';
import { AppStateService } from '../services';
import { GroupStateService } from './services/group-state.service';
import { NoteStateService } from '../notes/services/note-state.service';

@Component({
  selector: 'app-groups-display',
  templateUrl: './groups-display.component.html',
  styleUrls: ['./groups-display.component.css']
})
export class GroupsDisplayComponent implements OnInit {

	createFormId = 'create-group-form';
	formInputId = 'group-name-input';
	formInputValue: string = '';
	isFormHidden = true;

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
		this.isFormHidden = true;
		this.groupStateService.create(this.formInputValue);
		this.formInputValue = '';
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

	onInputBlur(event: FocusEvent) {

		this.isFormHidden = true;
		this.formInputValue = '';
	}

	trash(id: number) {

		if (confirm('Are you sure you want to trash this group? This will trash all notes within too')) {
			this.groupStateService.trash(id);
			this.noteStateService.trashInGroup(id);
		}
	}
}