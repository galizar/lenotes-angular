import { Test, TestingModule } from '@nestjs/testing';
import { 
	INestApplication, 
	HttpStatus 
} from '@nestjs/common';
import request from 'supertest';

import { NotesModule } from './../src/notes/notes.module';
import { updateDomainObjectTestRequest } from './utilities/testRequests';


describe('ApiController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NotesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/notes (POST) handler', () => {

		it('handles error on create request with invalid dto', () => {

			request(app.getHttpServer())
				.post('/notes')
				.send({
					name: 'a dummy name',
					// where's the rest of the note?!
				})
				.expect(HttpStatus.BAD_REQUEST);
		});
  });

	describe('/notes (PATCH) handler', () => {

		const updateOneRoute = '/notes/updateOne';

		it('handles name update request', () => {

			updateDomainObjectTestRequest(
				0,
				{name: 'señuelo'},
				HttpStatus.OK,
				app,
				updateOneRoute
			);
		});

		it('handles error on update request with invalid dto', () => {
			updateDomainObjectTestRequest( 0,
				{ isThisPropertyValid: 'no' },
				HttpStatus.BAD_REQUEST,
				app,
				updateOneRoute
			);
		});

		it('handles error on note not found', () => {
			updateDomainObjectTestRequest(
				5,
				{ content: 'betwix the cup and the lip' },
				HttpStatus.NOT_FOUND,
				app,
				updateOneRoute
			);
		});
	});

	describe('batch update handler', () => {

		it('batch updates notes', () => {
			return request(app.getHttpServer())
				.patch('/notes/batchUpdate')
				.send({
					ids: [0, 1],
					subDto: { isTrashed: true }
				})
				.expect(HttpStatus.OK);
		});
	});
});