import { DomainObjectStorage } from "../../index";

import { Note, ObjectMap } from '@lenotes-ng/model';
import { testNotes } from "@lenotes-ng/model";
import { UpdateNoteDto } from "@lenotes-ng/api-behavior";

export class NaiveNotesStorage extends DomainObjectStorage<Note> {

	private notes: ObjectMap<Note> = testNotes;

	private idPk = Number(Object.keys(testNotes).reduce((a, b) => {
		if (a > b)
			return a;
		else
			return b;
	})[0]);

	async create(withProps: Note['props']) {

		const id = ++this.idPk;
		this.notes[id] = withProps;
		return id;
	}

	async get(id: Note['id']) {

		const props = this.notes[id];
		if (props === undefined) throw Error('note not found');	
		return props;
	}

	async getAll() {
		return this.notes;
	}

	async update(obj: Note) {
		this.notes[obj.id] = obj.props;
	}

	async batchUpdate(ids: Note['id'][], dto: UpdateNoteDto) {

		for (const id of ids) {
			for (let prop of Object.keys(dto) as Array<keyof UpdateNoteDto>) {
				this.notes[id][prop] = dto[prop];
			};
		}
	}

	async delete(id: Note['id']) {
		delete this.notes[id];
	}
}
