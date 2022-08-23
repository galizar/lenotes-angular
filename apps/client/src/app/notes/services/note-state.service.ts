import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map, distinctUntilChanged } from 'rxjs/operators';

import { Note, NoteMap } from '@lenotes-ng/model';
import { AppStateService } from '../../services';
import { NoteService } from './note.service';
import { UpdateNoteDto } from '@lenotes-ng/api-behavior';

interface NoteState {
	notes: NoteMap,
	noteOnDisplay?: Note
}

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {

	private state: NoteState = {
		notes: Object.create(null),
		noteOnDisplay: undefined
	}

	private store = new BehaviorSubject<NoteState>(this.state);
	private state$ = this.store.asObservable();

  constructor(
		private noteService: NoteService,
		private appStateService: AppStateService
	) { 
		
		/** Register observer for update of note state when group on display changes */
		appStateService.groupOnDisplayId$.pipe(
			switchMap(groupOnDisplayId => {
				if (groupOnDisplayId === undefined) // only happens on initialization
					return noteService.getAll();
				else
					return noteService.getInGroup(groupOnDisplayId);
			})
		).subscribe(notes => {
			this.updateStoreNotes(notes);
		});
	}

	notes$ = this.state$.pipe(
		map(state => state.notes),
		distinctUntilChanged()
	);

	get(id: number) {
		return this.state.notes[id];
	}

	setNoteContent(id: number, content: string) {

		this.state.notes[id]['content'] = content;
		this.updateStoreNotes(this.state.notes);
		this.noteService.update(id, {content});
	}

	updateStoreNotes(notes: NoteMap) {
		this.updateState({ ...this.state, notes });
	}

	create(name: string, groupId?: number) {

		const newNote = {
			name,
			groupId,
			content: '',
			isTrashed: false
		};

		this.noteService.create(newNote).subscribe(id => {
			this.state.notes[id] = newNote;
			this.updateStoreNotes(this.state.notes);
		});
	}

	move(id: number, toGroupId: number) {

		this.update(id, {groupId: toGroupId});
	}

	update(id: number, dto: UpdateNoteDto) {

		this.state.notes[id] = { ...this.state.notes[id], ...dto};
		this.updateStoreNotes(this.state.notes);
		this.noteService.update(id, dto).subscribe();
	}

	batchUpdate(ids: number[], dto: UpdateNoteDto) {

		for (const id of ids) {
			for (const prop of Object.keys(dto) as Array<keyof UpdateNoteDto>) {
				this.state.notes[id][prop] = dto[prop];
			}
		}
		this.updateStoreNotes(this.state.notes);
		this.noteService.batchUpdate(ids, dto).subscribe();
	}

	trash(id: number) {

		this.update(id, {isTrashed: true});
	}

	trashInGroup(groupId: number) {

		const idsToTrash = [];

		for (const [id, props] of Object.entries(this.state.notes)) {
			if (props.groupId === groupId) {
				idsToTrash.push(Number(id));
			}
		}
		this.batchUpdate(idsToTrash, { isTrashed: true });
	}

	private updateState(state: NoteState) {
		this.store.next((this.state = state));
	}
}
