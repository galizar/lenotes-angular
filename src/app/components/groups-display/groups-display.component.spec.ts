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
	let debugElement: DebugElement;
	
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
		debugElement = fixture.debugElement;
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

		const groupButtons = debugElement.queryAll(By.css('.group-button'));

		expect(groupButtons.length).toEqual(expectedButtonCount);
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

		let firstNote = testNotes[0];
		let secondNote = testNotes[1]
		const toGroupId = secondNote.id;
		const dataTransfer = new DataTransfer();
		dataTransfer.setData('Note', JSON.stringify(firstNote));
		const droppedNoteEvent = new DragEvent('drop', {dataTransfer});

		component.dropOnGroup(droppedNoteEvent, toGroupId);
		let actualNote: Note | undefined;
		noteServiceStub.get(firstNote.id).subscribe(note => actualNote = note);

		if (!actualNote) throw Error('cant get note from note service');
		expect(actualNote.groupId).toEqual(toGroupId);
	});
});
