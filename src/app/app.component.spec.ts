import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { GroupsDisplayComponent } from './components/groups-display/groups-display.component';
import { NotesDisplayComponent } from './components/notes-display/notes-display.component';
import { GroupService, NoteService } from './services';
import { 
	testEnvObject,
	groupServiceStub,
	noteServiceStub
} from 'src/assets/test';
import { Group } from './model';

describe('AppComponent', () => {
	let appFixture: ComponentFixture<AppComponent>;
	let appComponent: AppComponent;

	let groupsElement: DebugElement;
	let notesElement: DebugElement;

  beforeEach(async () => {


    await TestBed.configureTestingModule({
			//schemas: [
			//	NO_ERRORS_SCHEMA
			//],
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
				GroupsDisplayComponent,
				NotesDisplayComponent
      ],
			providers: [
				{ provide: GroupService, useValue: groupServiceStub},
				{ provide: NoteService, useValue: noteServiceStub},
				{ provide: 'env', useValue: testEnvObject}
			]
    }).compileComponents();
  });

	beforeEach(() => {
		appFixture = TestBed.createComponent(AppComponent);
		appComponent = appFixture.componentInstance;
		appFixture.detectChanges();

		groupsElement = appFixture.debugElement.query(By.directive(GroupsDisplayComponent));
		notesElement = appFixture.debugElement.query(By.directive(NotesDisplayComponent));
	});

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it(`should have as title 'lenotes-angular'`, () => {
    expect(appComponent.title).toEqual('lenotes-angular');
  });

	it('sets the groupOnDisplayId property', () => {
		const id = 5;
		appComponent.setGroupOnDisplayId(id);
		expect(appComponent.groupOnDisplayId).toEqual(id);
	});

	it('listens for setGroupOnDisplayId events', () => {
		spyOn(console, 'log');

		
		groupsElement.triggerEventHandler('setGroupOnDisplayIdEvent', 1);

		const expectedGroupId = 1;
		expect(console.log).toHaveBeenCalledWith(
			'setGroupOnDisplayId in app component was called with id:', 
			expectedGroupId
		);
	});

	describe('Groups display', () => {

		it('creates child groups display component', () => {
			expect(groupsElement).toBeTruthy();
		});

		it('receives and inputs groupOnDisplayId back to groups display', () => {

			const firstGroupButton = appFixture.debugElement.query(By.css('[data-test-id="select-group-button"]'));

			if (!firstGroupButton) {
				fail('group button is not being extracted on query');
				return;
			}

			firstGroupButton.triggerEventHandler('click', {});
			appFixture.detectChanges();
			const selectedGroupId = firstGroupButton.attributes['data-group-id'];

			if (!selectedGroupId) {
				fail('group id is not being extracted from button element');
				return;
			};

			const groupsComponent = groupsElement.componentInstance;

			expect(String(groupsComponent.groupOnDisplayId)).toEqual(selectedGroupId);
		});
	});

	describe('Notes display', () => {

		it('creates child notes display component', () => {
			expect(notesElement).toBeTruthy();
		});

		it('inputs groupOnDisplayId to notes display', () => {

			let groupOnDisplayId = 0;

			appComponent.setGroupOnDisplayId(groupOnDisplayId);
			appFixture.detectChanges();

			expect(notesElement.componentInstance.groupOnDisplayId)
				.toEqual(groupOnDisplayId);
		});

		it('receives and inputs noteOnDisplayId back to notes display', () => {

			const firstNoteButton = appFixture.debugElement.query(By.css('[data-test-id="select-note-button"]'));
			if (!firstNoteButton) {
				fail('note button is not being extracted on query');
				return;
			}

			firstNoteButton.triggerEventHandler('click', {});
			appFixture.detectChanges();
			const selectedNoteId = firstNoteButton.attributes['data-note-id'];
			if (!selectedNoteId) {
				fail('note id is not being extracted from button element')
				return
			}
			const notesComponent = notesElement.componentInstance;

			expect(String(notesComponent.noteOnDisplayId)).toEqual(selectedNoteId);
		});

		it('displays the correct list of notes when a group is selected', () => {

			let groupOnDisplayId = 0;
			appComponent.setGroupOnDisplayId(groupOnDisplayId);
			appFixture.detectChanges();
			let expectedButtonCount = -1; // assignment to dummy to please the compiler 
			noteServiceStub.getAll().subscribe(notes => {
				expectedButtonCount = 
					notes.filter(note => note.groupId === groupOnDisplayId && !note.isTrashed).length;
			});

			const actualButtonCount = notesElement.queryAll(By.css('.note-button')).length;

			expect(actualButtonCount).toEqual(expectedButtonCount);
		});
	});
});
