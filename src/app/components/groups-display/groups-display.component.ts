import { Component, OnInit, OnChanges, EventEmitter, Input, Output} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop'
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Group, Note } from '../../model';
import { GroupService, NoteService } from '../../services/';

@Component({
  selector: 'app-groups-display',
  templateUrl: './groups-display.component.html',
  styleUrls: ['./groups-display.component.css']
})
export class GroupsDisplayComponent implements OnInit {

  @Input() groupOnDisplayId?: number;
	@Output() setGroupOnDisplayIdEvent = new EventEmitter<number>();

  groups: Group[] = [];

  constructor(
		private service: GroupService,
		private noteService: NoteService) { }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(groups => {
				this.groups = groups
			});
  }

	setGroupOnDisplayId(id: number): void {
		console.log('triggered setGroupOnDisplayIdEvent');
		this.setGroupOnDisplayIdEvent.emit(id);
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