import { DomainObjectStorage } from "../index";

import { Note } from '@lenotes-ng/model';
import { testNotes } from "@lenotes-ng/model";
import { UpdateNoteDto } from "@lenotes-ng/api-behavior";

export class NaiveNotesStorage extends DomainObjectStorage<Note> {

	private notes: Record<number, Note['id']> = testNotes;

	private idPk = Number(Object.keys(testNotes).reduce((a, b) => {
		if (a > b)
			return a;
		else
			return b;
	})[0]);

	create(obj: Note) {

		this.idPk++;
		const value = Object.values(obj);
		const newNote = {
			[this.idPk]: {
				...value[0]
			}
		};
		this.notes = {...this.notes, ...newNote};
		return this.idPk;
	}

	get(id: number) {
		
		const groupProps = this.notes[id];
		if (groupProps === undefined) {
			throw Error('group not found');
		}
		return {id: groupProps};
	}

	getAll(): Record<number, Note['id']> {
		return this.notes;
	}

	update(obj: Note): void {

		const id = Number(Object.keys(obj)[0]);
		const props = Object.values(obj)[0] as Note['id'];
		this.notes[id] = props;
	}

	batchUpdate(ids: number[], dto: UpdateNoteDto): void {

		for (const id of ids) {
			for (let prop of Object.keys(dto) as Array<keyof UpdateNoteDto>) {
				this.notes[id][prop] = dto[prop];
			};
		}
	}

	delete(id: number): void {
		delete this.notes[id];
	}
}