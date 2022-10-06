import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map, distinctUntilChanged } from 'rxjs/operators';

import { Note, Group, ObjectMap } from '@lenotes-ng/model';
import { AppStateService } from '../../services';
import { NoteService } from './note.service';
import { UpdateNoteDto } from '@lenotes-ng/api-behavior';

interface NoteState {
	notes: ObjectMap<Note>,
}

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {

	private state: NoteState = {
		notes: Object.create(null),
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
				if (groupOnDisplayId === undefined) {// only happens on initialization
					return noteService.getAll();
				}
				else {
					return noteService.getInGroup(groupOnDisplayId);
				}
			})
		).subscribe(notes => {
			this.updateStoreNotes(notes);
		});
	}

	notes$ = this.state$.pipe(
		map(state => state.notes),
		distinctUntilChanged()
	);

	get(id: Note['id']) {
		return this.state.notes[id];
	}

	setNoteContent(id: Note['id'], content: string) {

		this.state.notes[id]['content'] = content;
		this.updateStoreNotes(this.state.notes);
		this.noteService.update(id, {content}).subscribe();
	}

	updateStoreNotes(notes: ObjectMap<Note>) {
		this.updateState({ ...this.state, notes });
	}

	create(name: string, groupId?: Group['id']) {

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

	move(id: Note['id'], toGroupId: Group['id']) {

		this.update(id, {groupId: toGroupId});
	}

	update(id: Note['id'], dto: UpdateNoteDto) {

		this.state.notes[id] = { ...this.state.notes[id], ...dto};
		this.updateStoreNotes(this.state.notes);
		this.noteService.update(id, dto).subscribe();
	}

	batchUpdate(ids: Note['id'][], dto: UpdateNoteDto) {

		for (const id of ids) {
			for (const prop of Object.keys(dto) as Array<keyof UpdateNoteDto>) {
				this.state.notes[id][prop] = dto[prop];
			}
		}
		this.updateStoreNotes(this.state.notes);
		this.noteService.batchUpdate(ids, dto).subscribe();
	}
	
	delete(id: Note['id']) {

		delete this.state.notes[id];
		this.noteService.delete(id).subscribe();
	}

	batchDelete(ids: Note['id'][]) {

		for (const id of ids) {
			delete this.state.notes[id];
		}
		this.updateStoreNotes(this.state.notes);
		this.noteService.batchDelete(ids).subscribe();
	}

	trash(id: Note['id']) {

		this.update(id, {isTrashed: true});
	}

	trashInGroup(groupId: Group['id']) {

		const idsToTrash = [];

		for (const [id, props] of Object.entries(this.state.notes)) {
			if (props.groupId === groupId) {
				idsToTrash.push(Number(id));
			}
		}
		this.batchUpdate(idsToTrash, { isTrashed: true });
	}

	deleteInGroup(groupId: Group['id']) {

		const idsToDelete = [];

		for (const [id, props] of Object.entries(this.state.notes)) {
			if (props.groupId === groupId) {
				idsToDelete.push(Number(id));
			}
		}
		this.batchDelete(idsToDelete);
	}

	private updateState(state: NoteState) {
		this.store.next((this.state = state));
	}
}
