import { NotesStorage } from "../../index";

import { Note, Group, ObjectMap } from '@lenotes-ng/model';
import { testNotes } from "@lenotes-ng/model";
import { UpdateNoteDto } from "@lenotes-ng/api-behavior";

export class NaiveNotesStorage extends NotesStorage {

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

	async getInGroup(groupId: Group['id']) {

		const notesInGroup: ObjectMap<Note> = {};

		for (const [id, props] of Object.entries(this.notes)) {
			if (props.groupId === groupId) {
				notesInGroup[+id] = props;
			}
		}
		return notesInGroup;
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

	async trashInGroups(ids: Group['id'][]) {
		for (const groupId of ids) {
			for (const [id, props] of Object.entries(this.notes)) {
				if (props.groupId === groupId) {
					this.notes[+id] = {...props, isTrashed: true};
				}
			}
		}
	}

	async restoreInGroups(ids: Group['id'][]): Promise<void> {
		for (const groupId of ids) {
			for (const [id, props] of Object.entries(this.notes)) {
				if (props.groupId === groupId) {
					this.notes[+id] = {...props, isTrashed: false};
				}
			}
		}
	}

	async delete(id: Note['id']) {
		delete this.notes[id];
	}

	async batchDelete(ids: Note['id'][]) {
		for (const id of ids) {
			delete this.notes[id];
		}
	}
}
