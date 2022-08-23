import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';

import { GroupsModule } from '../src/groups/groups.module';
import { updateDomainObjectTestRequest } from './utilities/testRequests';

describe('GroupsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GroupsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

	describe('/groups/ (POST) handler', () => {

		it('handles error on create request with invalid dto', () => {
			return request(app.getHttpServer())
				.post('/groups')
				.send({
					name: 'a group',
					content: '', // <-- groups do not have content
					isTrashed: false,
				})
				.expect(HttpStatus.BAD_REQUEST);
		});
	});

	describe('/groups/updateOne/:id (PATCH) handler', () => {

		const updateOneRoute = '/groups/updateOne';

		it('handles name update request', () => {
			updateDomainObjectTestRequest(
				0,
				{ name: 'nuevo nombre' },
				HttpStatus.OK,
				app,
				updateOneRoute
			);
		});

		it('handles error on update request with invalid dto', () => {
			updateDomainObjectTestRequest(
				0,
				{ anExtraneousProp: 'LOL' },
				HttpStatus.BAD_REQUEST,
				app,
				updateOneRoute
			);
		});

		it('handles error on group not found', () => {
			updateDomainObjectTestRequest(
				-1,
				{name: 'foo'},
				HttpStatus.NOT_FOUND,
				app,
				updateOneRoute
			);
		});
	});
	
	describe('/batchUpdate (PATCH) handler', () => {

		it('handles batch update request', () => {
			return request(app.getHttpServer())
				.patch('/groups/batchUpdate')
				.send({
					ids: [0, 1],
					subDto: { isTrashed: true }
				})
				.expect(HttpStatus.OK);
		});
	});

	describe('/groups/:id (DELETE) handler', () => {

		it('handles delete request', () => {

			return request(app.getHttpServer())
				.delete('/groups/0')
				.expect(HttpStatus.OK);
		});
	});
});
