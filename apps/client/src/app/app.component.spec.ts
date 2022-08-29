import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupsDisplayComponent } from './groups/groups-display.component';
import { NotesDisplayComponent } from './notes/notes-display.component';
import { EditorComponent } from './editor/editor.component';
import { testEnvObject } from '../assets/test';

import { GroupService } from './groups/services/group.service';
import { NoteService } from './notes/services/note.service';
import { groupServiceStubBuilder, noteServiceStubBuilder } from '../assets/test';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStateService } from './services';

describe('AppComponent', () => {
	let appFixture: ComponentFixture<AppComponent>;
	let appComponent: AppComponent;

	let groupsElement: DebugElement;
	let notesElement: DebugElement;
	let editorElement: DebugElement;

  beforeEach(async () => {

		const groupServiceStub = groupServiceStubBuilder.build();
		const noteServiceStub = noteServiceStubBuilder.build();
		const appStateService = new AppStateService();

    await TestBed.configureTestingModule({
      imports: [
				ReactiveFormsModule,
				FormsModule
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
				{provide: AppStateService, useValue: appStateService},
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
