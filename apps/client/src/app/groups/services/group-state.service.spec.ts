import { TestBed } from '@angular/core/testing';

import { GroupService } from '../services/group.service';
import { GroupStateService } from './group-state.service';
import { groupServiceStubBuilder } from '../../../assets/test';
import { GroupMap, testGroups } from '@lenotes-ng/model';

describe('GroupStateService', () => {
  let service: GroupStateService;
	let groupService: GroupService;

  beforeEach(() => {

		const groupServiceStub = groupServiceStubBuilder.build();

    TestBed.configureTestingModule({
			providers: [
				{ provide: GroupService, useValue: groupServiceStub },
			]
		});
    service = TestBed.inject(GroupStateService);
		groupService = TestBed.inject(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('should obtain groups on initialization', () => {

		let expectedGroups: GroupMap | undefined;
		let actualGroups: GroupMap | undefined;
		groupService.getAll().subscribe(groups => {
    	expectedGroups = groups;
		});

		service.groups$.subscribe(groups => {
			actualGroups = groups;
		});

		expect(actualGroups).toEqual(expectedGroups);
	});

	it('triggers group creation and saves group to state', () => {

		let expectedGroupCount = Object.keys(testGroups).length + 1;
		let actualGroupCount: number;
		service.groups$.subscribe(groups => {
			actualGroupCount = Object.keys(groups).length;
		});

		service.create('a new group at ' + Date.now());

		expect(actualGroupCount!).toEqual(expectedGroupCount!);
	});

	it('triggers group deletion and removes it from state', () => {
		throw new Error('not implemented');
	});
});
