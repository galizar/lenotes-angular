import { DomainObjectStorage } from "../index";

import { Note } from '@lenotes-ng/model';
import { testNotes } from "@lenotes-ng/model";

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

	delete(id: number): void {

		this.get(id); // throw error if note doesn't exist

		this.notes = this.notes.filter(n => n.id !== id);
	}
}