import { DomainObjectStorage } from "../index";

import { Note } from '@lenotes-ng/model';
import { testNotes } from "@lenotes-ng/model";
import { UpdateNoteDto } from "@lenotes-ng/api-behavior";

export class NaiveNotesStorage extends DomainObjectStorage<Note> {

	private notes: Note[] = (() => {
		return testNotes;
	})();

	private idPk = testNotes.reduce((prev, curr) => {
		if (prev.id > curr.id)
			return prev;
		else
			return curr;
	}).id;

	create(object: Note) {

		this.idPk++;

		const newNote = {
			...object,
			id: (() => this.idPk)()
		};

		this.notes.push(newNote);
		return newNote.id;
	}

	get(id: number) {
		const note = this.notes.find(note => note.id === id);
		if (note === undefined) throw Error('Note not found');
		return note;
	}

	getAll() {
		return this.notes;
	}

	update(object: Note): void {

		this.notes = this.notes.map(note => {
			if (note.id === object.id) {
				return object;
			}
			return note;
		}) 
	}

	batchUpdate(ids: number[], dto: UpdateNoteDto): void {

		const updatedNotes = [];

		for (const id of ids) {
			const note = this.get(id);

			for (let prop of Object.keys(dto) as Array<keyof UpdateNoteDto>) {
				note[prop] = dto[prop];
			};
			updatedNotes.push(note);
		}

		this.notes = updatedNotes;
	}

	delete(id: number): void {

		this.get(id); // throw error if note doesn't exist

		this.notes = this.notes.filter(n => n.id !== id);
	}
}