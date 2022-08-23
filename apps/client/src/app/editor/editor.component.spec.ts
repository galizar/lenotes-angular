import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { EditorComponent } from './editor.component';
import {
	appStateServiceStubBuilder,
	noteServiceStubBuilder,
} from '../../assets/test';
import { AppStateService } from '../services';
import { Note } from '@lenotes-ng/model';
import { NoteStateService } from '../notes/services/note-state.service';
import { NoteService } from '../notes/services/note.service';

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
		let propsOnDisplay: Note['props'] | undefined;
		noteServiceStub.get(idOfNoteOnDisplay).subscribe(props => {
			propsOnDisplay = props;
		});
		if (propsOnDisplay === undefined) return fail('could not get note on display from note service');
		component.appStateService.setGroupOnDisplayId(propsOnDisplay.groupId);

		component.appStateService.setNoteOnDisplayId(idOfNoteOnDisplay);
		fixture.detectChanges();

		const editorTextarea: HTMLTextAreaElement = 
			fixture.debugElement.query(By.css('#editor-content')).nativeElement;
		if (!editorTextarea) return fail('not getting textarea element from query');
		const editorContent = editorTextarea.value;

		expect(editorContent).toEqual(propsOnDisplay.content);
	});

	it('updates content of note on display', fakeAsync(() => {

		const idOfNoteToModify = 0;
		const newContent = "this is some new content created at: " + Date.now();
		let propsToModify: Note['props'] | undefined; 
		noteServiceStub.get(idOfNoteToModify).subscribe(props => {
			propsToModify = props;
		});
		if (propsToModify === undefined) return fail('could not get note to modify from note service');
		component.appStateService.setGroupOnDisplayId(propsToModify.groupId);
		component.appStateService.setNoteOnDisplayId(idOfNoteToModify);

		component.content.setValue(newContent);
		tick(501); // wait for observable to emit (debounce time)

		let modifiedProps: Note['props'] | undefined;
		noteServiceStub.get(idOfNoteToModify).subscribe(props => {
			modifiedProps = props;
		});
		if (modifiedProps === undefined) return fail('could not get note after modification from note service');

		expect(modifiedProps.content).toEqual(newContent);
	}));
});
