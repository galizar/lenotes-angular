import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupsDisplayComponent } from './components/groups-display/groups-display.component';
import { NotesDisplayComponent } from './components/notes-display/notes-display.component';
import { EditorComponent } from './editor/editor.component';
import { testEnvObject } from '../assets/test';

import { GroupService, NoteService } from './services';
import { groupServiceStubBuilder, noteServiceStubBuilder } from '../assets/test';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
	let appFixture: ComponentFixture<AppComponent>;
	let appComponent: AppComponent;

	let groupsElement: DebugElement;
	let notesElement: DebugElement;
	let editorElement: DebugElement;

  beforeEach(async () => {

		const groupServiceStub = groupServiceStubBuilder.build();
		const noteServiceStub = noteServiceStubBuilder.build();

    await TestBed.configureTestingModule({
      imports: [
				ReactiveFormsModule
			],
      declarations: [
        AppComponent,
				GroupsDisplayComponent,
				NotesDisplayComponent,
				EditorComponent
      ],
			providers: [ 
				{provide: GroupService, useValue: groupServiceStub},
				{provide: NoteService, useValue: noteServiceStub},
				{provide: 'env', useValue: testEnvObject},
			]
    }).compileComponents();
  });

	beforeEach(() => {
		appFixture = TestBed.createComponent(AppComponent);
		appComponent = appFixture.componentInstance;
		appFixture.detectChanges();

		groupsElement = appFixture.debugElement.query(By.directive(GroupsDisplayComponent));
		notesElement = appFixture.debugElement.query(By.directive(NotesDisplayComponent));
		editorElement = appFixture.debugElement.query(By.directive(EditorComponent));
	});

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

	describe('Groups display', () => {

		it('creates child groups display component', () => {
			expect(groupsElement).toBeTruthy();
		});
	});

	describe('Notes display', () => {

		it('creates child notes display component', () => {
			expect(notesElement).toBeTruthy();
		});
	});

	describe('Editor', () => {

		it('creates editor component', () => {
			expect(editorElement).toBeTruthy();
		});
	});
});
