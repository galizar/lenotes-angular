import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';

import { testNotes } from '@lenotes-ng/shared/assets';
import { UpdateNoteDto } from '../dto/update-note.dto';

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

		const noteToGet = testNotes[0];

		const actualNote = service.get(noteToGet.id);

		expect(actualNote).toEqual(noteToGet);
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

	describe('note update operations', () => {

		const updateTestFunction = (updateDto: UpdateNoteDto) => {
			const noteToUpdate = service.get(0);

			service.update(noteToUpdate.id, updateDto);

			const actualNote = service.get(noteToUpdate.id);
			for (const [prop, value] of Object.entries(updateDto)) {
				expect(actualNote[prop as keyof UpdateNoteDto]).toEqual(value)
			}
		};

		it('update name', () => {
			updateTestFunction({name: 'new name created at ' + Date.now()});
		});

		it('update groupId', () => {
			updateTestFunction({groupId: 1});
		});
		
		it('updates content', () => {
				updateTestFunction({content: 'this is some fresh content created at ' + Date.now()});
			}
		);

		it('updates isTrashed', () => {
			updateTestFunction({isTrashed: true});
		});
	});

	// how to fool TS to actually test this? this is a obviously possible run-time error
	it('throws error when updating a non-valid property of Note', () => {
		throw Error('not impl');
	});

	it('removes note', () => {

		const noteToRemove = service.get(0);

		service.remove(noteToRemove.id);

		expect(() => {
			service.get(noteToRemove.id);
		}).toThrowError();
	});
});
