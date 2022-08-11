import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './services/groups.service';

describe('GroupsController', () => {
  let controller: GroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [GroupsService],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

	describe('create handler', () => {

		it('returns created group', () => {
			throw Error('not implemented');
		});

		it('handles error on request with invalid dto', () => {
			throw Error('not implemented');
		});

		// how this operation could fail? failure to connect with a database or
		// other database error? the current naive implementation of group service
		// cannot fail in creating a group it seems to me
		it('handles error on group creation', () => {
			throw Error('not implemented');
		});
	});

	describe('getAll handler', () => {
		it('returns groups', () => {
			throw Error('not implemented');
		});
	});

	describe('get handler', () => {
		it('returns group', () => {
			throw Error('not implemented');
		});

		it('handles group not found error', () => {
			throw Error('not implemented');
		});
	});

	describe('update handler', () => {

		it('handles error on request with invalid dto', () => {
			throw Error('not implemented');
		});

		it('delegates group update to group service', () => {
			throw Error('not implemented');
		});

		it('handles group not found error', () => {
			throw Error('not implemented');
		});
	});

	describe('remove handler', () => {

		it('handles group not found error', () => {
			throw Error('not implemented');
		});

		it('delegates group removal to group service', () => {
			throw Error('not implemented');
		});
		throw Error('not implemented');
	});
});
