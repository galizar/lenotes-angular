import { createClient } from "@supabase/supabase-js";

import { DomainObjectStorage } from "@lenotes-ng/data-storage";
import { Group } from "@lenotes-ng/model";
import { Database } from '../schema';
import { UpdateGroupDto } from "@lenotes-ng/api-behavior";
import { propsCamelCasify, propsSnakeCasify } from '../util/camelCaseUtilities';

type group = Database['public']['Tables']['groups']['Row'];
const propColumns = 'name, is_trashed';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export class SupabaseGroupsStorage extends DomainObjectStorage<Group> {

	async create(withProps: Group['props']) {

		const session = await supabase.auth.session();

		setImmediate(() => {
			if (session === null || session.access_token === undefined) {
				throw Error('no user is signed in');
			}
		});

		const {user} = await supabase.auth.api.getUser(session?.access_token!);

		const {data, error} = await supabase
			.from<group>('groups')
			.insert({...propsSnakeCasify(withProps), user_id: user!.id});

		if (error) throw Error(error.message);

		return data![0].id;
	}

	async get(id: number): Promise<Group['props']> {

		const {data, error} = await supabase
			.from<group>('groups')
			.select(propColumns)
			.eq('id', id);
		
		if (error) throw Error(error.message);

		if (data === null || data.length === 0) {
			throw Error('not found');
		}

		const group = data[0];
		return propsCamelCasify(group);
	}

	async getAll() {

		const {data, error} = await supabase
			.from<group>('groups')
			.select(propColumns);
		
		if (error) throw Error(error.message);

		return propsCamelCasify(data);
	}

	async update(object: Group) {

		const {error} = await supabase	
			.from<group>('groups')
			.update({...propsSnakeCasify(object.props)}, {returning: 'minimal'})
			.eq('id', object.id);

		if (error) throw Error(error.message);
	}

	async batchUpdate(ids: Group['id'][], dto: UpdateGroupDto) {

		const {error} = await supabase
			.from<group>('groups')
			.update({...propsSnakeCasify(dto)}, {returning: 'minimal'})
			.in('id', ids);

		if (error) throw Error(error.message);
	}

	async delete(id: number) {

		const {error} = await supabase
			.from<group>('groups')
			.delete({returning: 'minimal'})
			.eq('id', id);
		
		if (error) throw Error(error.message);
	}
}