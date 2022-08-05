import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import { testEnvObject } from '../../assets/test';
import { HttpClient } from '@angular/common/http';

describe('NoteService', () => {
  let service: NoteService;
	let httpClient: HttpClient;
	let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ]
		});

		httpClient = TestBed.inject(HttpClient);
		httpController = TestBed.inject(HttpTestingController);
    service = new NoteService(testEnvObject, httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
