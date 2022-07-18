import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { GroupService } from './group.service';
import { Group } from '../model/Group';
import { EnvObject } from 'src/environments';
import { testGroups } from 'src/assets/test';

describe('GroupService', () => {
  let service: GroupService;
	let TestEnvObj: EnvObject = {
		production: false,
		GROUPS_API_ROOT: 'dummyGroupsApi',
		NOTES_API_ROOT: 'dummyNotesApi'
	}

	let httpClient: HttpClient;
	let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [ GroupService ]
		});
		httpClient = TestBed.inject(HttpClient);
		controller = TestBed.inject(HttpTestingController);
		service = new GroupService(TestEnvObj, httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('gets all groups', () => {

		let gottenGroups: Group[] | undefined;
		service.getAll().subscribe(
			(groups) => {
				gottenGroups = groups;
			}
		);
		const request = controller.expectOne(TestEnvObj.GROUPS_API_ROOT);
		request.flush(testGroups);
		controller.verify(); // this verifies that there no outstanding requests
		expect(gottenGroups).toEqual(testGroups);
	});

	it('handles an HTTP error getting all groups', () => {

		const status = 404;
		const statusText = 'Not Found';
		const errorEvent = new ErrorEvent('Not Found Error');

		let gottenError: HttpErrorResponse | undefined;

		service.getAll().subscribe({
			next: groups => fail('expected an error, not groups'),
			error: error => {
				gottenError = error;
			},
			complete: () => fail('expected an error, not a complete')
		});

		const request = controller.expectOne(TestEnvObj.GROUPS_API_ROOT);
		request.error(
			errorEvent,
			{ status, statusText }
		);

		if (!gottenError) {
			throw new Error('Error needs to be defined');
		}
		expect(gottenError.error).toBe(errorEvent);
		expect(gottenError.status).toBe(status);
		expect(gottenError.statusText).toBe(statusText);
	});
});
