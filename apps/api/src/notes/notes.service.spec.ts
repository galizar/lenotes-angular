import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';

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
		throw Error('not impl');
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
		throw Error('not impl');
	});

	it('updates note groupId', () => {
		throw Error('not impl');
	});

	it('updates note content', () => {
		throw Error('not impl');
	});

	it('updates note isTrashed property', () => {
		throw Error('not impl');
	});

	it('throws error when updating a non-valid property of Note', () => {
		throw Error('not impl');
	});

	it('removes note', () => {
		throw Error('not impl')
	});
});
