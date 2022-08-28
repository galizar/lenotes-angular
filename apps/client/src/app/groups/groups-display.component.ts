import { Component, OnInit } from '@angular/core';

import { Note, Group, ObjectMap} from '@lenotes-ng/model';
import { AppStateService } from '../services';
import { GroupStateService } from './services/group-state.service';
import { NoteStateService } from '../notes/services/note-state.service';
import { buildViewModel } from '../util/buildViewModel';

type GroupsViewModel = {
	groupOnDisplayId?: number 
	groups: ObjectMap<Group> 
	displayingTrash: boolean
};

@Component({
  selector: 'app-groups-display',
  templateUrl: './groups-display.component.html',
  styleUrls: ['./groups-display.component.css']
})
export class GroupsDisplayComponent implements OnInit {

	createFormId = 'create-group-form';
	formInputId = 'group-name-input';
	formInputValue: string = '';
	objectKeys = Object.keys;

	vm$ = buildViewModel<GroupsViewModel>({
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

		if (confirm('Are you sure you want to trash this group? This will trash all notes within too')) {
			this.groupStateService.trash(id);
			this.noteStateService.trashInGroup(id);
		}
	}
}