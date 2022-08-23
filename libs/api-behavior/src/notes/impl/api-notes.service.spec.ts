import { ApiNotesService } from "./api-notes.service";
import { DomainObjectStorage, NaiveNotesStorage } from '@lenotes-ng/data-storage';
import { Note, NoteMap, testNotes } from '@lenotes-ng/model';
import { UpdateNoteDto } from '../../index';

describe('ApiNotesService', () => {

	let storage: DomainObjectStorage<Note>;
	let service: ApiNotesService;

	beforeEach(() => {
		storage = new NaiveNotesStorage;
		service = new ApiNotesService(storage);
	});

	it('gets note', () => {

		const noteWithId = 0;
		const expectedNote = testNotes[noteWithId];

		const actualNote = service.get(noteWithId);

		expect(actualNote).toEqual(expectedNote);
	});

	it('gets notes in group', () => {

		const groupId = 1;
		const expectedNotes: NoteMap = Object.create(null);
		for (const [id, props] of Object.entries(testNotes)) {
			if (props.groupId === groupId)
				expectedNotes[+id] = props;
		}

		const actualNotes = service.getInGroup(groupId);

		expect(actualNotes).toEqual(expectedNotes);
	});

	it('creates note', () => {

		let expectedNoteProps = {
			// no id here. id is defined by service
			name: 'a test note',
			groupId: 0,
			content: 'some content created at ' + Date.now(),
			isTrashed: false
		} 

		const createdNoteId = service.create(expectedNoteProps);
		const actualNoteProps = service.get(createdNoteId);

		for (const prop of Object.keys(expectedNoteProps) as Array<keyof Note['props']>) {
			expect(actualNoteProps[prop]).toEqual(expectedNoteProps[prop]);
		}
	});

	describe('note update operations', () => {

		const updateTestFunction = (updateDto: UpdateNoteDto) => {
			const noteWithId = 0
			service.update(noteWithId, updateDto);

			const actualNote = service.get(noteWithId);
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

	it('batch updates notes', () => {
		throw Error('not implemented');
	})

	it('removes note', () => {

		const noteWithId = 0;

		service.delete(noteWithId);

		expect(() => {
			service.get(noteWithId);
		}).toThrowError();
	});
});