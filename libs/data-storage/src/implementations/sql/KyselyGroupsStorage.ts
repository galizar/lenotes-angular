import { Kysely, PostgresDialect } from "kysely";
import { Pool } from 'pg';

import { DB } from "./kyselyDB";
import { DomainObjectStorage } from "../../abstractions/DomainObjectStorage"
import { Group, GroupProps } from '@lenotes-ng/model';

export class KyselyGroupsStorage extends DomainObjectStorage<Group> {

	public db: Kysely<DB> = new Kysely<DB>({
		dialect: new PostgresDialect({
			pool: new Pool({
				connectionString: process.env.DATABASE_URL
			})
		})
	});

	async create(withProps: GroupProps) {

		const selection = await this.db.insertInto('groups')
			.columns(['name', 'is_trashed'])
			.values({ ...withProps })
			.returning(['group_id'])
			.executeTakeFirst();

		if (selection === undefined) {
			throw Error('error while creating group');
		}

		return selection.group_id;	
	}


}