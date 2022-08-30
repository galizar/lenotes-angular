import { Kysely } from "kysely";

import { Note } from "@lenotes-ng/model"
import { UpdateNoteDto } from "@lenotes-ng/api-behavior";
import { DomainObjectStorage } from "../../../index";
import { DB } from "./kyselyDB"
import { postgresDB } from "./postgresDB";

export class KyselyNotesStorage extends DomainObjectStorage<Note> {

	private db: Kysely<DB> = postgresDB;

	async create(withProps: Note['props']) {

		const selection = await this.db.insertInto('notes')
			.columns(['name', 'isTrashed'])
			.values({ ...withProps })
			.returning(['noteId'])
			.executeTakeFirst();

		if (selection === undefined) {
			throw Error('error while creating note');
		}

		return selection.noteId;	
	}

	async get(id: Note['id']) {
		const row = await this.db
			.selectFrom('notes')
			.where('noteId', '=', id)
			.executeTakeFirstOrThrow();

		return row as Note['props'];
	}

	async getAll() {
		const props = await this.db
			.selectFrom('notes')
			.selectAll()
			.execute();
		
		return props as Note['props'][]; 
	}

	async update(obj: Note) {
		await this.db
			.updateTable('notes')
			.set({ ...obj.props })
			.where('noteId', '=', obj.id)
			.execute();
	}

	async batchUpdate(ids: Note['id'][], dto: UpdateNoteDto) {
		await this.db
			.updateTable('notes')
			.set({ ...dto })
			.where('noteId', 'in', ids)
			.execute();
	}

	async delete(id: Note['id']) {
		await this.db
			.deleteFrom('notes')
			.where('noteId', '=', id)
			.execute();
	}
}