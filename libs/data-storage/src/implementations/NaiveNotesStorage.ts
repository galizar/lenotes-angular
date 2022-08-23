import { DomainObjectStorage } from "../index";

import { Note, NoteMap } from '@lenotes-ng/model';
import { testNotes } from "@lenotes-ng/model";
import { UpdateNoteDto } from "@lenotes-ng/api-behavior";

export class NaiveNotesStorage extends DomainObjectStorage<Note> {

	private notes: NoteMap = testNotes;

	private idPk = Number(Object.keys(testNotes).reduce((a, b) => {
		if (a > b)
			return a;
		else
			return b;
	})[0]);

	create(withProps: Note['props']) {

		const id = ++this.idPk;
		this.notes[id] = withProps;
		return id;
	}

	get(id: number) {
		
		const props = this.notes[id];
		if (props === undefined) throw Error('group not found');
		return props;
	}

	getAll(): NoteMap {
		return this.notes;
	}

	update(obj: Note): void {
		this.notes[obj.id] = obj.props;
	}

	batchUpdate(ids: Note['id'][], dto: UpdateNoteDto): void {

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