import { ApiNotesService } from "./api-notes.service";
import { NotesStorage, NaiveNotesStorage } from '@lenotes-ng/data-storage';
import { Note, ObjectMap, testNotes } from '@lenotes-ng/model';
import { UpdateNoteDto } from '../../index';

describe('ApiNotesService', () => {

	let storage: NotesStorage;
	let service: ApiNotesService;

	beforeEach(() => {
		storage = new NaiveNotesStorage();
		service = new ApiNotesService(storage);
	});

	it('gets note', async () => {

		const noteWithId = 0;
		const expectedNote = testNotes[noteWithId];

		const actualNote = await service.get(noteWithId);

		expect(actualNote).toEqual(expectedNote);
	});

	it('gets notes in group', async () => {

		const groupId = 1;
		const expectedNotes: ObjectMap<Note> = Object.create(null);
		for (const [id, props] of Object.entries(testNotes)) {
			if (props.groupId === groupId)
				expectedNotes[+id] = props;
		}

		const actualNotes = await service.getInGroup(groupId);

		expect(actualNotes).toEqual(expectedNotes);
	});

	it('creates note', async () => {

		let expectedNoteProps = {
			// no id here. id is defined by service
			name: 'a test note',
			groupId: 0,
			content: 'some content created at ' + Date.now(),
			isTrashed: false
		} 

		const createdNoteId = await service.create(expectedNoteProps);
		const actualNoteProps = await service.get(createdNoteId);

		for (const prop of Object.keys(expectedNoteProps) as Array<keyof typeof expectedNoteProps>) {
			expect(actualNoteProps[prop]).toEqual(expectedNoteProps[prop]);
		}
	});

	describe('note update operations', () => {

		const updateTestFunction = async (updateDto: UpdateNoteDto) => {
			const noteWithId = 0
			await service.update(noteWithId, updateDto);

			const actualNote = await service.get(noteWithId);
			for (const [prop, value] of Object.entries(updateDto)) {
				expect(actualNote[prop as keyof UpdateNoteDto]).toEqual(value)
			}
		};

		it('update name', async () => {
			await updateTestFunction({name: 'new name created at ' + Date.now()});
		});

		it('update groupId', async () => {
			await updateTestFunction({groupId: 1});
		});
		
		it('updates content', async () => {
				await updateTestFunction({content: 'this is some fresh content created at ' + Date.now()});
			}
		);

		it('updates isTrashed', async () => {
			await updateTestFunction({isTrashed: true});
		});
	});

	it('batch updates notes', async () => {
		throw Error('not implemented');
	})

	it('removes note', async () => {

		const noteWithId = 0;

		await service.delete(noteWithId);

		try {
			await service.get(noteWithId);
		} catch (e) {
			expect(e).toEqual(Error('note not found'));
		}
	});
});