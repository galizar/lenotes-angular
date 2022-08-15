import { Component, OnInit } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Note } from '@lenotes-ng/model';
import { AppStateService } from '../../services';
import { GroupStateService } from './group-state.service';
import { NoteStateService } from '../notes-display/note-state.service';

@Component({
  selector: 'app-groups-display',
  templateUrl: './groups-display.component.html',
  styleUrls: ['./groups-display.component.css']
})
export class GroupsDisplayComponent implements OnInit {

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
}