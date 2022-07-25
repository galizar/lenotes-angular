import { TestBed } from '@angular/core/testing';
import { GroupService } from 'src/app/services';

import { GroupStateService } from './group-state.service';
import { groupServiceStub, testEnvObject } from 'src/assets/test';
import { Group } from 'src/app/model';

describe('GroupStateService', () => {
  let service: GroupStateService;
	let groupService: GroupService;

  beforeEach(() => {
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

		let expectedGroups: Group[] | undefined;
		let actualGroups: Group[] | undefined;
		groupService.getAll().subscribe(groups => {
    	expectedGroups = groups;
		});

		service.groups$.subscribe(groups => {
			actualGroups = groups;
		});

		expect(actualGroups).toEqual(expectedGroups);
	});
});
