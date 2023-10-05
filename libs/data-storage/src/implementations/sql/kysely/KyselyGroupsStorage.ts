import { Kysely } from "kysely";

import { Group } from '@lenotes-ng/model';
import { UpdateGroupDto } from "@lenotes-ng/data-storage";
import { DomainObjectStorage } from "../../../index";
import { DB } from "./kyselyDB";
import { postgresDB } from "./postgresDB";

export class KyselyGroupsStorage extends DomainObjectStorage<Group> {

	private db: Kysely<DB> = postgresDB;

	async create(withProps: Group['props']) {

		const selection = await this.db.insertInto('groups')
			.columns(['name', 'isTrashed'])
			.values({ ...withProps })
			.returning(['groupId'])
			.executeTakeFirst();

		if (selection === undefined) {
			throw Error('error while creating group');
		}

		return selection.groupId;	
	}

	async get(id: Group['id']) {
		const row = await this.db
			.selectFrom('groups')
			.where('groupId', '=', id)
			.executeTakeFirstOrThrow() as Group['props'];
		return row;
	}

	async getAll() {
		const props = await this.db
			.selectFrom('groups')
			.selectAll()
			.execute();
		
		return props as Group['props'][]; 
	}

	async update(obj: Group) {
		await this.db
			.updateTable('groups')
			.set({ ...obj.props })
			.where('groupId', '=', obj.id)
			.execute();
	}

	async batchUpdate(ids: Group['id'][], dto: UpdateGroupDto) {
		await this.db
			.updateTable('groups')
			.set({ ...dto })
			.where('groupId', 'in', ids)
			.execute();
	}

	async delete(id: Group['id']) {
		await this.db
			.deleteFrom('groups')
			.where('groupId', '=', id)
			.execute();
	}

	async batchDelete(ids: Group['id'][]) {
		await this.db
			.deleteFrom('groups')
			.where('groupId', 'in', ids)
			.execute();
	}
}