import { Test, TestingModule } from '@nestjs/testing';

import { NotesController } from './notes.controller';
import { UpdateNoteDto } from './dto/update-note.dto';
import { 
	DomainObjectStorage, 
	NaiveNotesStorage,
	NotesStorage
} from '@lenotes-ng/data-storage';
import { testNotes, Note, ObjectMap } from '@lenotes-ng/model';

describe('NotesController', () => {
  let controller: NotesController;
	let notesStorage: NotesStorage;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
				{
					provide: DomainObjectStorage,
					useValue: new NaiveNotesStorage()
				}
			],
    }).compile();

    controller = module.get<NotesController>(NotesController);
		notesStorage = module.get<NotesStorage>(NotesStorage);

		jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

	describe('create handler', () => {

		it('returns id of created note', () => {

			const newNoteId = 3;
			const newNote = {
				name: 'foo',
				content: 'lorem ipsum',
				groupId: 1,
				isTrashed: false,
			};

			jest.spyOn(notesStorage, 'create').mockImplementation(async () => await newNoteId);

			expect(controller.create(newNote)).toEqual(newNoteId);
		});
	});

	describe('getAll handler', () => {

		it('returns notes from service', () => {
			const expectedNotes = testNotes;
			jest.spyOn(notesStorage, 'getAll').mockImplementation(async () => await expectedNotes);

			const actualNotes = controller.getAll();

			expect(actualNotes).toEqual(expectedNotes);
		});
	});

	describe('get handler', () => {

		it('returns note from service', () => {
			const expectedNote = testNotes[0];
			jest.spyOn(notesStorage, 'get').mockImplementation(async () => await expectedNote);

			const actualNote = controller.get(String(0));

			expect(actualNote).toEqual(expectedNote);
		});
	});

	describe('getInGroup handler', () => {

		it('returns notes in a certain group', () => {
			const idOfGroupToGetNotesOf = 1;
			const expectedNotes: ObjectMap<Note> = {};

			Object.entries(testNotes)
				.map(([id, props]) => {
					if (props.groupId === idOfGroupToGetNotesOf) expectedNotes[+id] = props;
				});

			jest.spyOn(notesStorage, 'getInGroup').mockImplementation(async () => await expectedNotes);

			const actualNotes = controller.getInGroup(String(idOfGroupToGetNotesOf));

			expect(actualNotes).toEqual(expectedNotes);
		});
	});

	describe('update handler', () => {

		it('delegates note update to note service', () => {

			const noteToUpdateId = '0';
			const newNameObject: UpdateNoteDto = {name: 'dummy'}
			jest.spyOn(notesStorage, 'update');

			controller.update(noteToUpdateId, newNameObject);

			expect(notesStorage.update).toHaveBeenCalledWith(Number(noteToUpdateId), newNameObject);
		});
	});

	describe('batch update handler', () => {
		throw Error('no impl');
	});

	describe('remove handler', () => {

		it('delegates remove request to service', () => {

			const idOfNoteToRemove = 0;
			jest.spyOn(notesStorage, 'delete');

			controller.remove(String(idOfNoteToRemove));

			expect(notesStorage.delete).toHaveBeenCalledWith(idOfNoteToRemove);
		});
	});
});
