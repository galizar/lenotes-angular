import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Note } from '@lenotes-ng/model';
import { AppStateService } from '../../services';
import { GroupStateService } from '../services/group-state.service';
import { NoteStateService } from '../../notes/services/note-state.service';

@Component({
  selector: 'app-groups-display',
  templateUrl: './groups-display.component.html',
  styleUrls: ['./groups-display.component.css']
})
export class GroupsDisplayComponent implements OnInit {

	createFormId = 'create-group-form';
	formInputId = 'group-name-input';
	formInputValue: string = '';

	// view model
	vm$ = combineLatest(
		[
			this.appStateService.groupOnDisplayId$,
			this.groupStateService.groups$,
			this.appStateService.displayingTrash$
		]
	).pipe(
		map((props) => {
			return {
				groupOnDisplayId: props[0], 
				groups: props[1], 
				displayingTrash: props[2]
			};
		})
	);

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

		this.noteStateService.move(note.id, groupId);
	}

	allowDrop(event: DragEvent): void {
		event?.preventDefault();
	}


	onSubmitCreate(event: SubmitEvent, form: HTMLFormElement) {

		event.preventDefault();
		form.style.display = '';

		this.groupStateService.create(this.formInputValue);
		this.formInputValue = '';
	}

	toggleFormVisibility(form: HTMLFormElement, nameInput: HTMLInputElement) {

		if (form.style.display === '') {
			form.style.display = 'block';
			nameInput.focus();
		} else {
			form.style.display = '';
		}
	}

	onInputBlur(form: HTMLFormElement) {

		form.style.display = '';
		this.formInputValue = '';
	}

	trash(id: number) {

		if (confirm('Are you sure you want to trash this group?'))
			this.groupStateService.trash(id);
	}
}