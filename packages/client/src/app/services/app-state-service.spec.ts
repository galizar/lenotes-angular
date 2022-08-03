import { TestBed } from '@angular/core/testing';

import { AppStateService } from './app-state.service';

let service: AppStateService;

describe('AppStateService', () => {

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				AppStateService
			]
		});

		service = new AppStateService();
	});

	it('creates the service', () => {
		expect(service).toBeTruthy();
	});

	it('sets and emits correct groupOnDisplayId', () => {

		const expectedGroupOnDisplayId = 0;
		let actualGroupOnDisplayId: number | undefined;
		service.groupOnDisplayId$.subscribe(id => actualGroupOnDisplayId = id);

		service.setGroupOnDisplayId(expectedGroupOnDisplayId);

		expect(actualGroupOnDisplayId).toEqual(expectedGroupOnDisplayId)
	});

	it('sets and emits correct noteOnDisplayId', () => {

		const expectedNoteOnDisplayId = 0;
		let actualNoteOnDisplayId: number | undefined;
		service.noteOnDisplayId$.subscribe(id => actualNoteOnDisplayId = id);

		service.setNoteOnDisplayId(expectedNoteOnDisplayId);

		expect(actualNoteOnDisplayId).toEqual(expectedNoteOnDisplayId)
	});
});