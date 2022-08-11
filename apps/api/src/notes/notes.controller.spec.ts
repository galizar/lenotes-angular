import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './services/notes.service';

describe('NotesController', () => {
  let controller: NotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

	describe('create handler', () => {
		throw Error('not implemented');
	});

	describe('getAll handler', () => {
		throw Error('not implemented');
	});

	describe('get handler', () => {
		throw Error('not implemented');
	});

	describe('getInGroup handler', () => {
		throw Error('not implemented');
	});

	describe('remove handler', () => {
		throw Error('not implemented');
	});
});
