import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import { testEnvObject } from '../../../assets/test';
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


	describe('create request', () => {
		it('requests note creation', () => {
			throw new Error('not implemented');
		});

		it('handles error on request to create a note', () => {
			throw new Error('not implemented');
		});
	});

	describe('create request', () => {
		it('requests note', () => {
			throw new Error('not implemented');
		});

		it('handles error on request to get a note', () => {
			throw new Error('not implemented');
		});
	});

	it('requests all notes', () => {
		throw new Error('not implemented');
	});

	describe('update request', () => {
		it('requests to update a note (success)', () => {
			throw new Error('not implemented');
		});

		it('handles error on request to update a note', () => {
			throw new Error('not implemented');
		});
	});

	describe('delete request', () => {
		it('requests to delete a note', () => {
			throw new Error('not implemented');
		});
	});
});
