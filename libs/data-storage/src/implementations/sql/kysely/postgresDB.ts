import { 
	Kysely, 
	CamelCasePlugin,
	PostgresDialect
} from "kysely";
import { Pool } from "pg";

import { DB } from "./kyselyDB";

export const postgresDB = new Kysely<DB>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: process.env.DATABASE_URL
		})
	}),
	plugins: [
		new CamelCasePlugin()
	]
});