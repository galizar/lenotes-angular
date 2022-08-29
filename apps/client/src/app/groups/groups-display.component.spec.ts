import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GroupsDisplayComponent } from './groups-display.component';
import { AppStateService } from '../services';
import { GroupService } from './services/group.service';
import { NoteService } from '../notes/services/note.service';
import { 
	groupServiceStubBuilder, 
	noteServiceStubBuilder, 
} from '../../assets/test';
import { Note } from '@lenotes-ng/model';
import { testNotes } from '@lenotes-ng/model';

describe('GroupsDisplayComponent', () => {
  let component: GroupsDisplayComponent;
  let fixture: ComponentFixture<GroupsDisplayComponent>;
	let debugElement: DebugElement;
	
  beforeEach(async () => {

		const appStateService = new AppStateService();
		const groupServiceStub = groupServiceStubBuilder.build();
		const noteServiceStub = noteServiceStubBuilder.build();

    await TestBed.configureTestingModule({
			imports: [
				FormsModule
			],
      declarations: [ GroupsDisplayComponent ],
			providers: [
				{ provide: GroupService, useValue: groupServiceStub }, 
			  { provide: NoteService, useValue: noteServiceStub },
				{ provide: AppStateService, useValue: appStateService }
			]
    })
    .compileComponents();
  });

	beforeEach(() => {
    fixture = TestBed.createComponent(GroupsDisplayComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
		debugElement = fixture.debugElement;
	});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('displays the correct list of group buttons', () => {

		// it should display only buttons for groups that
		// are not trashed. trashed groups will be handled
		// elsewhere
		let expectedButtonCount = 0;
		component.vm$.subscribe(vm => {
			for (const group of Object.values(vm.groups)) {
				if (!group.isTrashed) expectedButtonCount++;
			}
		});

		const actualButtonCount = debugElement.queryAll(By.css('.group-button')).length;

		expect(actualButtonCount).toBeGreaterThan(0);
		expect(actualButtonCount).toEqual(expectedButtonCount);
	});

	it('selects group when group button is clicked', () => {

		let expectedGroupOnDisplayId: number | undefined;
		const firstGroupButton = debugElement.query(By.css('.group-button'));
		expectedGroupOnDisplayId = Number(firstGroupButton.attributes['data-group-id']);

		firstGroupButton.triggerEventHandler('click');

		fixture.detectChanges();
		let actualGroupOnDisplayId: number | undefined;
		component.vm$.subscribe(vm => actualGroupOnDisplayId = vm.groupOnDisplayId);

		expect(actualGroupOnDisplayId).toEqual(expectedGroupOnDisplayId);
	});

	it('moves dropped note to group over which it was dropped', () => {

		const idOfNoteToMove = 0;
		let propsToModify = testNotes[idOfNoteToMove];
		let otherProps = testNotes[1]
		const toGroupId = otherProps.groupId;
		const dataTransfer = new DataTransfer();
		dataTransfer.setData('Note', JSON.stringify(propsToModify));
		const droppedNoteEvent = new DragEvent('drop', {dataTransfer});

		if (toGroupId === undefined)
			throw Error('toGroupId should be defined');

		component.dropOnGroup(droppedNoteEvent, toGroupId);

		// if the note was moved successfully then the note should be in 
		// the state when the group it was moved to is on display
		component.appStateService.setGroupOnDisplayId(toGroupId);

		let actualProps: Note['props'] | undefined;
		component.noteStateService.notes$.subscribe(notes => {
			actualProps = notes[idOfNoteToMove]
		});

		if (!actualProps) return fail('note is not being moved to target group');
		expect(actualProps.groupId).toEqual(toGroupId);
	});

	it('trashes notes in group when group is trashed', () => {
		throw Error('no impl');
	});
});
