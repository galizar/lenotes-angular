import { TestBed } from '@angular/core/testing';
import { GroupService } from '../../services';

import { GroupStateService } from './group-state.service';
import { groupServiceStubBuilder } from '../../../assets/test';
import { Group } from '@lenotes-ng/shared/model';

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
