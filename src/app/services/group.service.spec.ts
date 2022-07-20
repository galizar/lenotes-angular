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
	let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [ GroupService ]
		});
		httpClient = TestBed.inject(HttpClient);
		httpController = TestBed.inject(HttpTestingController);
		service = new GroupService(TestEnvObj, httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('gets all groups', () => {

		let actualGroups: Group[] | undefined;
		service.getAll().subscribe(
			(groups) => {
				actualGroups = groups;
			}
		);
		const request = httpController.expectOne(TestEnvObj.GROUPS_API_ROOT);
		request.flush(testGroups);
		httpController.verify(); // this verifies that there no outstanding requests
		expect(actualGroups).toEqual(testGroups);
	});

	it('handles an HTTP error response getting all groups', () => {

		const expectedResponse = new HttpErrorResponse({status: 404, statusText: 'Not Found'});
		let actualResponse: HttpErrorResponse | undefined;

		service.getAll().subscribe({
			next: groups => fail('expected an error, not groups'),
			error: error => {
				actualResponse = error;
			},
			complete: () => fail('expected an error, not a complete')
		});

		const request = httpController.expectOne(TestEnvObj.GROUPS_API_ROOT);
		request.flush(expectedResponse);

		if (!actualResponse) {
			throw new Error('Error needs to be defined');
		}
		expect(actualResponse.status).toBe(expectedResponse.status);
		expect(actualResponse.statusText).toBe(expectedResponse.statusText);
	});
});
