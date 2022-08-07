import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';

import { Note } from './entities/note.entity';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

	it('gets note', () => {

	});

	it('creates note', () => {

		let expectedNote = {
			// no id here. id is defined by service
			name: 'a test note',
			groupId: 0,
			content: 'some content created at ' + Date.now(),
			isTrashed: false
		} 

		const returnedNote = service.create(expectedNote);
		const actualNote = service.get(returnedNote.id);

		for (const property of Object.keys(expectedNote) as Array<keyof typeof expectedNote>) {
			expect(returnedNote[property]).toEqual(expectedNote[property]);
			expect(actualNote[property]).toEqual(expectedNote[property]);
		}

		expect(returnedNote.id).toBe(actualNote.id);
	});

	it('updates note name', () => {
		fail('not impl');
	});

	it('updates note groupId', () => {
		fail('not impl');
	});

	it('updates note content', () => {
		fail('not impl');
	});

	it('updates note isTrashed property', () => {
		fail('not impl');
	});

	it('throws error when updating a non-valid property of Note', () => {
		fail('not impl');
	});

	it('removes note', () => {
		fail('not impl')
	});
});
