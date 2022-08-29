import { ComponentFixture, tick, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppStateService } from '../services';
import { NoteService } from './services/note.service';
import { NotesDisplayComponent } from './notes-display.component';
import { 
	testEnvObject, 
	noteServiceStubBuilder,
} from '../../assets/test';

describe('NotesDisplayComponent', () => {
  let component: NotesDisplayComponent;
  let fixture: ComponentFixture<NotesDisplayComponent>;
	let debugElement: DebugElement;

  beforeEach(async () => {

		const noteServiceStub = noteServiceStubBuilder.build();
		const appStateService = new AppStateService();

    await TestBed.configureTestingModule({
			imports: [ 
				FormsModule
			],
      declarations: [ NotesDisplayComponent ],
			providers: [ 
				{provide: 'env', useValue: testEnvObject},
				{provide: NoteService, useValue: noteServiceStub},
				{provide: AppStateService, useValue: appStateService}
			]
    })
		.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDisplayComponent);
    fixture.detectChanges();
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

		let expectedButtonCount = 0;
		component.vm$.subscribe(vm => {
			for (const props of Object.values(vm.notes)) {
				if (!props.isTrashed) expectedButtonCount++;
			}
		});

		const actualButtonCount = debugElement.queryAll(By.css('.note-button')).length;

		expect(actualButtonCount).toBeGreaterThan(0);
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
