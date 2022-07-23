import { TestBed } from '@angular/core/testing';
import { AppStateService, NoteService } from 'src/app/services';
import { appStateServiceStub, noteServiceStub } from 'src/assets/test';

import { NoteStateService } from './note-state.service';

describe('NoteStateService', () => {
  let service: NoteStateService;
	let noteService: NoteService;
	let appStateService: AppStateService;

  beforeEach(() => {
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
		})

		expect(actualNoteIds).toEqual(expectedNoteIds);
	});
});
