import { Test, TestingModule } from '@nestjs/testing';

import { NotesController } from './notes.controller';
import { NotesService } from './services/notes.service';
import { UpdateNoteDto } from '@lenotes-ng/api-behavior';
import { DomainObjectStorage, NaiveNotesStorage } from '@lenotes-ng/data-storage';
import { testNotes } from '@lenotes-ng/model';

describe('NotesController', () => {
  let controller: NotesController;
	let notesService: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
				NotesService,
				{
					provide: DomainObjectStorage,
					useValue: new NaiveNotesStorage()
				}
			],
    }).compile();

    controller = module.get<NotesController>(NotesController);
		notesService = module.get<NotesService>(NotesService);

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

			jest.spyOn(notesService, 'create').mockImplementation(() => newNoteId);

			expect(controller.create(newNote)).toEqual(newNoteId);
		});
	});

	describe('getAll handler', () => {

		it('returns notes from service', () => {
			const expectedNotes = testNotes;
			jest.spyOn(notesService, 'getAll').mockImplementation(() => expectedNotes);

			const actualNotes = controller.getAll();

			expect(actualNotes).toEqual(expectedNotes);
		});
	});

	describe('get handler', () => {

		it('returns note from service', () => {
			const expectedNote = testNotes[0];
			jest.spyOn(notesService, 'get').mockImplementation(() => expectedNote);

			const actualNote = controller.get(String(expectedNote.id));

			expect(actualNote).toEqual(expectedNote);
		});
	});

	describe('getInGroup handler', () => {

		it('returns notes in certain group', () => {
			const idOfGroupToGetNotesOf = 1;
			const expectedNotes = testNotes.filter(note => note.id === idOfGroupToGetNotesOf);
			jest.spyOn(notesService, 'getInGroup').mockImplementation(() => expectedNotes);

			const actualNotes = controller.getInGroup(String(idOfGroupToGetNotesOf));

			expect(actualNotes).toEqual(expectedNotes);
		});
	});

	describe('update handler', () => {

		it('delegates note update to note service', () => {

			const noteToUpdateId = '0';
			const newNameObject: UpdateNoteDto = {name: 'dummy'}
			jest.spyOn(notesService, 'update');

			controller.update(noteToUpdateId, newNameObject);

			expect(notesService.update).toHaveBeenCalledWith(Number(noteToUpdateId), newNameObject);
		});
	});

	describe('remove handler', () => {

		it('delegates remove request to service', () => {

			const idOfNoteToRemove = 0;
			jest.spyOn(notesService, 'delete');

			controller.remove(String(idOfNoteToRemove));

			expect(notesService.delete).toHaveBeenCalledWith(idOfNoteToRemove);
		});
	});
});
