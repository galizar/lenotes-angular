import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NoteService } from 'src/app/services';
import { NotesDisplayComponent } from './notes-display.component';
import { 
	testEnvObject, 
	noteServiceStub
} from 'src/assets/test';
import { DebugElement } from '@angular/core';

describe('NotesDisplayComponent', () => {
  let component: NotesDisplayComponent;
  let fixture: ComponentFixture<NotesDisplayComponent>;
	let rootDebugElement: DebugElement;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
      declarations: [ NotesDisplayComponent ],
			providers: [
				{provide: 'env', useValue: testEnvObject},
				{provide: NoteService, useValue: noteServiceStub},
			]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

		rootDebugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('displays the correct list of note buttons when none group is selected', () => {

		let expectedButtonCount = -1;
		noteServiceStub.getAll().subscribe(notes => {
			expectedButtonCount = notes.filter(note => !note.isTrashed).length;
		})

		const buttonElements = rootDebugElement.queryAll(By.css('.note-button'));
		const gottenButtonCount = buttonElements.length;

		expect(gottenButtonCount).toEqual(expectedButtonCount)
	});

	it('emits event to display note in editor when button is clicked', () => {

		let emittedNoteId: number | undefined;
		component.setNoteOnDisplayIdEvent.subscribe(id => {
			emittedNoteId = id;
		});
		const firstNoteButton = rootDebugElement.query(By.css('[data-test-id="select-note-button"]'));
		const expectedNoteId = Number(firstNoteButton.attributes['data-note-id']);

		firstNoteButton.triggerEventHandler('click', {});

		expect(emittedNoteId).toEqual(expectedNoteId);
	});
});
