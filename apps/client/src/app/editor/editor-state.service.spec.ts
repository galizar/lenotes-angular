import { TestBed } from '@angular/core/testing';
import { appStateServiceStubBuilder, noteServiceStubBuilder } from '../../assets/test';
import { AppStateService, NoteService } from '../services';

import { EditorStateService } from './editor-state.service';

describe('EditorStateService', () => {
  let service: EditorStateService;

  beforeEach(() => {

		const appStateServiceStub = appStateServiceStubBuilder.build();
		const noteServiceStub = noteServiceStubBuilder.build();

    TestBed.configureTestingModule({
			providers: [
				{provide: AppStateService, useValue: appStateServiceStub},
				{provide: NoteService, useValue: noteServiceStub}
			]
		});
    service = TestBed.inject(EditorStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('sets and emits contentToDisplay', () => {

		const expectedContent = "this is some new content created at " + Date.now();
		let actualContent: string | undefined;
		service.contentToDisplay$.subscribe(content => {
			actualContent = content;
		});

		service.setContentToDisplay(expectedContent);

		expect(actualContent).toEqual(expectedContent);
	});
});
