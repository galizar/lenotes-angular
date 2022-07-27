import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppStateService, NoteService } from 'src/app/services';
import { NotesDisplayComponent } from './notes-display.component';
import { 
	testEnvObject, 
	noteServiceStubBuilder,
	appStateServiceStubBuilder
} from 'src/assets/test';
import { DebugElement } from '@angular/core';

describe('NotesDisplayComponent', () => {
  let component: NotesDisplayComponent;
  let fixture: ComponentFixture<NotesDisplayComponent>;
	let debugElement: DebugElement;

  beforeEach(async () => {

		const noteServiceStub = noteServiceStubBuilder.build();
		const appStateServiceStub = appStateServiceStubBuilder.build();

    await TestBed.configureTestingModule({
			imports: [ ],
      declarations: [ NotesDisplayComponent ],
			providers: [ {provide: 'env', useValue: testEnvObject},
				{provide: NoteService, useValue: noteServiceStub},
				{provide: AppStateService, useValue: appStateServiceStub}
			]
    })
		.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDisplayComponent);
    fixture.detectChanges()
    component = fixture.componentInstance;
		debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('displays the correct list of notes when a group is selected', () => {

		let groupOnDisplayId = 0;
		component.appStateService.setGroupOnDisplayId(groupOnDisplayId);
		fixture.detectChanges();

		let expectedButtonCount = -1; // dummy to please the compiler 
		component.noteStateService.notes$.subscribe(notes => {
			expectedButtonCount = notes.filter(n => !n.isTrashed).length;
		});

		const actualButtonCount = debugElement.queryAll(By.css('.note-button')).length;

		expect(actualButtonCount).toEqual(expectedButtonCount);
	});

	it('selects note when note button is clicked', () => {

		let expectedNoteOnDisplayId: number | undefined;
		// making sure here a group is on display, otherwise there may be no note buttons
		component.appStateService.setGroupOnDisplayId(1);
		fixture.detectChanges();
		const firstNoteButton = debugElement.query(By.css('.note-button'));
		expectedNoteOnDisplayId = Number(firstNoteButton.attributes['data-note-id']);

		firstNoteButton.triggerEventHandler('click');
		fixture.detectChanges();

		let actualNoteOnDisplayId: number | undefined;
		component.vm$.subscribe(vm => actualNoteOnDisplayId = vm.noteOnDisplayId);

		expect(actualNoteOnDisplayId).toEqual(expectedNoteOnDisplayId);
	})
});
