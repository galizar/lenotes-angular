import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppStateService, NoteService } from 'src/app/services';
import { appStateServiceStubBuilder, noteServiceStubBuilder } from 'src/assets/test';

import { NoteStateService } from './note-state.service';
import { Note } from 'src/app/model';

describe('NoteStateService', () => {
  let service: NoteStateService;
	let noteService: NoteService;
	let appStateService: AppStateService;


  beforeEach(() => {

		const noteServiceStub = noteServiceStubBuilder.build();
		const appStateServiceStub = appStateServiceStubBuilder.build();

    TestBed.configureTestingModule({
			providers: [
				{provide: NoteService, useValue: noteServiceStub},
				{provide: AppStateService, useValue: appStateServiceStub}
			]
		});
    service = TestBed.inject(NoteStateService);
		noteService = TestBed.inject(NoteService);
		appStateService = TestBed.inject(AppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('updates state to only contain notes of group on display', () => {

		const groupOnDisplayId = 0; 
		let expectedNoteIds: number[] | undefined;
		let actualNoteIds: number[] | undefined;
		noteService.getInGroup(groupOnDisplayId).subscribe(notes => {
			expectedNoteIds = notes.filter(n => !n.isTrashed).map(n => n.id);
		});

		appStateService.setGroupOnDisplayId(groupOnDisplayId);

		service.notes$.subscribe(notes => {
			// the service filters trashed notes so no need to filter here
			actualNoteIds = notes.map(n => n.id);
		});

		expect(actualNoteIds).toEqual(expectedNoteIds);
	});

	it('moves note to group', () => {

		// given 
		const idOfNoteToMove = 0;
		const idOfGroupToMoveTo = 1; // or expected group id
		let actualGroupId: number | undefined;
		let groupIdOfNoteToMove = -1; // dummy to stop compiler's yapping
		noteService.get(idOfNoteToMove).subscribe(note => {
			groupIdOfNoteToMove = note.groupId;
		});
		// it's required to set on display the group id of the note to move
		// so that the note to move is on state. the test fails if the note to move is
		// not in the state
		appStateService.setGroupOnDisplayId(groupIdOfNoteToMove);

		// when
		service.move(idOfNoteToMove, idOfGroupToMoveTo);

		// then
		// local state verification
		service.notes$.subscribe(notes => {
			const noteToMove = notes.find(n => n.id === idOfNoteToMove);
			if (noteToMove === undefined) return fail('note is not in state service');
			actualGroupId = noteToMove.groupId;
		});

		expect(actualGroupId).toEqual(idOfGroupToMoveTo);

		// remote state (http service) verification
		noteService.get(idOfNoteToMove).subscribe(note => actualGroupId = note.groupId);
			
		expect(actualGroupId).toEqual(idOfGroupToMoveTo);
	});

	it('sets note content', () => {

		// given
		const idOfNoteToModify = 0;
		let noteToModify: Note | undefined;
		const newContent = "this is some new content created at " + Date.now();
		noteService.get(idOfNoteToModify).subscribe(note => {
			noteToModify = note;
		});
		if (noteToModify === undefined) return fail('could not get note to modify from note service');
		appStateService.setGroupOnDisplayId(noteToModify.groupId); // this is needed for the note to be in the state

		// when
		service.setNoteContent(idOfNoteToModify, newContent);

		// then
		let actualContent: string | undefined;

		// local state verification
		service.notes$.subscribe(notes => {
			const noteToMove = notes.find(n => n.id === idOfNoteToModify);
			if (noteToMove === undefined) return fail('note is not in state service');
			actualContent = noteToMove.content
		});

		expect(actualContent).toEqual(newContent);

		// remote state (http service) verification
		noteService.get(idOfNoteToModify).subscribe(note => actualContent = note.content);

		expect(actualContent).toEqual(newContent);
	});
});
