import { Component, OnInit, OnChanges, EventEmitter, Input, Output} from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Group, Note } from 'src/app/model';
import { GroupService, NoteService, AppStateService} from 'src/app/services/';
import { GroupStateService } from './group-state.service';

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
			this.appStateService.groupOnDisplayId$,
			this.groupStateService.groups$
		]
	).pipe(
		map(([groupOnDisplayId, groups]) => {
			return {groupOnDisplayId, groups}
		})
	);

  constructor(
		public noteService: NoteService,
		public appStateService: AppStateService,
		public groupStateService: GroupStateService) { }

  ngOnInit(): void {
  }

	dropOnGroup(event: DragEvent, groupId: number): void {

		event.preventDefault();
		const stringifiedNote = event.dataTransfer?.getData('Note');
		if (!stringifiedNote) throw Error('stringified note not extracted correctly');
		const note = JSON.parse(stringifiedNote) as Note;

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