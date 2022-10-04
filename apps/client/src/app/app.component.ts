import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';

import { AppStateService } from './services';
import { EditorStateService } from './editor/services/editor-state.service';
import { NoteStateService } from './notes/services/note-state.service';
import { Group, Note } from '@lenotes-ng/model';
import { GroupStateService } from './groups/services/group-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lenotes-angular';

	vm$ = combineLatest({
		displayingTrash: this.appStateService.displayingTrash$,
		groupOnDisplayId: this.appStateService.groupOnDisplayId$,
		nameToDisplay: this.editorStateService.nameToDisplay$
	});

	constructor(
		public appStateService: AppStateService,
		public editorStateService: EditorStateService,
		public noteStateService: NoteStateService,
		public groupStateService: GroupStateService
	) {}

	allowDrop(event: DragEvent) {
		event.preventDefault();
	}

	dropToTrash(event: DragEvent) {
		event.preventDefault();
		const noteString = event.dataTransfer?.getData('Note');
		const groupString = event.dataTransfer?.getData('Group');

		if (noteString) {
			const note = JSON.parse(noteString) as Note;

			if (confirm('Are you sure you want to trash this note'))
				this.noteStateService.trash(note.id);

		} else if (groupString) { 
			const group = JSON.parse(groupString) as Group;

			if (confirm('Are you sure you want to trash this group? This will trash all notes within too.'))
				this.groupStateService.trash(group.id);
				this.noteStateService.trashInGroup(group.id);
		}
	}

	dropToRestore(event: DragEvent) {

	}
}
