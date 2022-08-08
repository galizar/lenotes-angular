import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { EditorComponent } from './editor.component';
import {
	appStateServiceStubBuilder,
	noteServiceStubBuilder,
} from '../../assets/test';
import { AppStateService, NoteService } from '../services';
import { Note } from '@lenotes-ng/shared/model';
import { NoteStateService } from '../components/notes-display/note-state.service';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
	let appStateServiceStub: AppStateService;
	let noteServiceStub: NoteService;

  beforeEach(async () => {

		appStateServiceStub = appStateServiceStubBuilder.build();
		noteServiceStub = noteServiceStubBuilder.build();

    await TestBed.configureTestingModule({
      declarations: [ EditorComponent ],
			imports: [
				ReactiveFormsModule
			],
			providers: [
				{provide: AppStateService, useValue: appStateServiceStub},
				{provide: NoteService, useValue: noteServiceStub},
				{
					provide: NoteStateService,
					useValue: new NoteStateService(noteServiceStub, appStateServiceStub)
				}
			]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('displays content of note on display', () => {

		const idOfNoteOnDisplay = 0;
		let noteOnDisplay: Note | undefined;
		noteServiceStub.get(idOfNoteOnDisplay).subscribe(note => {
			noteOnDisplay = note;
		});
		if (noteOnDisplay === undefined) return fail('could not get note on display from note service');
		component.appStateService.setGroupOnDisplayId(noteOnDisplay.groupId);

		component.appStateService.setNoteOnDisplayId(idOfNoteOnDisplay);
		fixture.detectChanges();

		const editorTextarea: HTMLTextAreaElement = 
			fixture.debugElement.query(By.css('#editor-content')).nativeElement;
		if (!editorTextarea) return fail('not getting textarea element from query');
		const editorContent = editorTextarea.value;

		expect(editorContent).toEqual(noteOnDisplay.content);
	});

	it('updates content of note on display', fakeAsync(() => {

		const idOfNoteToModify = 0;
		const newContent = "this is some new content created at: " + Date.now();
		let noteToModify: Note | undefined; 
		noteServiceStub.get(idOfNoteToModify).subscribe(note => {
			noteToModify = note;
		});
		if (noteToModify === undefined) return fail('could not get note to modify from note service');
		component.appStateService.setGroupOnDisplayId(noteToModify.groupId);
		component.appStateService.setNoteOnDisplayId(idOfNoteToModify);

		component.content.setValue(newContent);
		tick(501); // wait for observable to emit (debounce time)

		let modifiedNote: Note | undefined;
		noteServiceStub.get(idOfNoteToModify).subscribe(note => {
			modifiedNote = note;
		});
		if (modifiedNote === undefined) return fail('could not get note after modification from note service');

		expect(modifiedNote.content).toEqual(newContent);
	}));
});
