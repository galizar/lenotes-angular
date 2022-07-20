import { Component, OnInit, OnChanges, EventEmitter, Input, Output} from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Group, Note } from 'src/app/model';
import { GroupService, NoteService, AppStateService} from 'src/app/services/';

@Component({
  selector: 'app-groups-display',
  templateUrl: './groups-display.component.html',
  styleUrls: ['./groups-display.component.css']
})
export class GroupsDisplayComponent implements OnInit {

	// unnecesary to use combineLatest as of now, but will keep
	// this structure for consistency and for ease of addition of more state
	// view model
	vm$ = combineLatest(
		[
			this.stateService.groupOnDisplayId$
		]
	).pipe(
		map(([groupOnDisplayId]) => {
			return {groupOnDisplayId}
		})
	);

  groups: Group[] = [];

  constructor(
		private service: GroupService,
		public noteService: NoteService,
		public stateService: AppStateService) { }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(groups => {
				this.groups = groups
			});
  }

	dropOnGroup(event: DragEvent, groupId: number): void {

		event.preventDefault();
		const stringifiedNote = event.dataTransfer?.getData('Note');
		if (!stringifiedNote) throw Error('stringified note not extracted correctly');
		const note = JSON.parse(stringifiedNote) as Note;

		console.log('dropOnGroup was called');

		this.noteService.move(note.id, groupId)
			.pipe(
				catchError(err => of(`Error: ${err}`))
			)
			.subscribe(
				() => console.log(`Succesfully moved note ${note.name} to group with id: ${groupId}`)
			);
	}

	allowDrop(event: DragEvent): void {
		event?.preventDefault();
	}
}