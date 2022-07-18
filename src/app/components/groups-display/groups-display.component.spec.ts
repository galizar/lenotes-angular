import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { By } from '@angular/platform-browser';

import { GroupsDisplayComponent } from './groups-display.component';
import { GroupService, NoteService } from 'src/app/services';
import { testNotes, testEnvObject, groupServiceStub, noteServiceStub} from 'src/assets/test';
import { DebugElement } from '@angular/core';
import { Note } from 'src/app/model';

describe('GroupsDisplayComponent', () => {
  let component: GroupsDisplayComponent;
  let fixture: ComponentFixture<GroupsDisplayComponent>;
	let rootDebugElement: DebugElement;
	
  beforeEach(async () => {

    await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
      declarations: [ GroupsDisplayComponent ],
			providers: [
				{ provide: GroupService, useValue: groupServiceStub }, 
			  { provide: NoteService, useValue: noteServiceStub },
				{ provide: 'env', useValue: testEnvObject }
			]
    })
    .compileComponents();
  });

	beforeEach(() => {
    fixture = TestBed.createComponent(GroupsDisplayComponent);
    component = fixture.componentInstance;
		rootDebugElement = fixture.debugElement;
    fixture.detectChanges();
	});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('displays the correct list of group buttons', () => {

		// it should display only buttons for groups that
		// are not trashed. trashed groups will be handled
		// elsewhere
		const expectedButtonCount = component.groups.filter(group => !group.isTrashed).length;

		const groupButtons = rootDebugElement.queryAll(By.css('.group-button'));

		expect(groupButtons.length).toEqual(expectedButtonCount);
	});

	it('emits setGroupOnDisplayIdEvent', () => {

		let expectedGroupId: number | undefined;
		let emittedGroupId: number | undefined;
		component.setGroupOnDisplayIdEvent.subscribe(id => {
			emittedGroupId = id;
		});
		const firstGroupButton = rootDebugElement.query(By.css('[data-test-id="select-group-button"]'));
		expectedGroupId = Number(firstGroupButton.attributes['data-group-id']);

		firstGroupButton.triggerEventHandler('click', {});

		expect(emittedGroupId).toEqual(expectedGroupId);
	});

	it('triggers event to move dropped note to group over which it was dropped', () => {

		const note = testNotes[0];
		let dataTransfer = new DataTransfer();
		dataTransfer.setData('Note', JSON.stringify(note));
		const droppedNoteEvent = new DragEvent('drop', {dataTransfer});
		const firstGroupButton = rootDebugElement.query(By.css('[data-test-id="select-group-button"]'));

		spyOn(component, 'dropOnGroup');
		firstGroupButton.parent?.triggerEventHandler('drop', droppedNoteEvent);

		expect(component.dropOnGroup).toHaveBeenCalled();
	});

	// move this test to the app component and actually compare the group ids
	it('moves dropped note to group over which it was dropped', () => {

		let firstNote = testNotes[0];
		let secondNote = testNotes[1]
		const toGroupId = secondNote.id;
		const dataTransfer = new DataTransfer();
		dataTransfer.setData('Note', JSON.stringify(firstNote));
		const droppedNoteName = firstNote.name;
		const droppedNoteEvent = new DragEvent('drop', {dataTransfer});

		spyOn(console, 'log');
		component.dropOnGroup(droppedNoteEvent, toGroupId);

		expect(console.log)
			.toHaveBeenCalledWith(`Succesfully moved note ${droppedNoteName} to group with id: ${toGroupId}`);
	});
});
