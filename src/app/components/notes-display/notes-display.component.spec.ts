import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppStateService, NoteService } from 'src/app/services';
import { NotesDisplayComponent } from './notes-display.component';
import { 
	testEnvObject, 
	noteServiceStub
} from 'src/assets/test';
import { DebugElement } from '@angular/core';

describe('NotesDisplayComponent', () => {
  let component: NotesDisplayComponent;
  let fixture: ComponentFixture<NotesDisplayComponent>;
	let debugElement: DebugElement;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
      declarations: [ NotesDisplayComponent ],
			providers: [
				{provide: 'env', useValue: testEnvObject},
				{provide: NoteService, useValue: noteServiceStub},
				AppStateService
			]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

		debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('displays the correct list of note buttons when none group is selected', () => {

		let expectedButtonCount = -1;
		noteServiceStub.getAll().subscribe(notes => {
			expectedButtonCount = notes.filter(note => !note.isTrashed).length;
		})

		const buttonElements = debugElement.queryAll(By.css('.note-button'));
		const actualButtonCount = buttonElements.length;

		expect(actualButtonCount).toEqual(expectedButtonCount)
	});

	it('displays the correct list of notes when a group is selected', () => {

		let groupOnDisplayId = 0;
		component.stateService.setGroupOnDisplayId(groupOnDisplayId);
		fixture.detectChanges();
		let expectedButtonCount = -1; // assignment to dummy to please the compiler 
		noteServiceStub.getAll().subscribe(notes => {
			expectedButtonCount =
				notes.filter(note => note.groupId === groupOnDisplayId && !note.isTrashed).length;
		});

		const actualButtonCount = debugElement.queryAll(By.css('.note-button')).length;

		expect(actualButtonCount).toEqual(expectedButtonCount);
	});

	it('selects note when note button is clicked', () => {

		let expectedNoteOnDisplayId: number | undefined;
		const firstNoteButton = debugElement.query(By.css('.note-button'));
		expectedNoteOnDisplayId = Number(firstNoteButton.attributes['data-note-id']);

		firstNoteButton.triggerEventHandler('click');

		fixture.detectChanges();
		let actualNoteOnDisplayId: number | undefined;
		component.vm$.subscribe(vm => actualNoteOnDisplayId = vm.noteOnDisplayId);

		expect(actualNoteOnDisplayId).toEqual(expectedNoteOnDisplayId);
	})
});
