import { DomainObjectStorage } from "@lenotes-ng/data-storage";
import { Group, ObjectMap } from "@lenotes-ng/model";
import { UpdateGroupDto } from "@lenotes-ng/data-storage";
import { propsCamelCasify, propsSnakeCasify } from '../util/camelCaseUtilities';
import { supabase } from '../db';
import { validate } from '../util/validate';

const propColumns = 'name, isTrashed:is_trashed';

export class SupabaseGroupsStorage extends DomainObjectStorage<Group> {

	async create(withProps: Group['props']) {

		const {data, error} = await supabase
			.from('groups')
			.insert({...propsSnakeCasify(withProps)})
			.select().single();

		validate(data, error);

		return data!.id;
	}

	async get(id: number): Promise<Group['props']> {

		const {data, error} = await supabase
			.from('groups')
			.select(propColumns)
			.eq('id', id)
			.single();
		
		validate(data, error);

		return {...data!};
	}

	async getAll() {

		const {data, error} = await supabase
			.from('groups')
			.select(`id, ${propColumns}`);
		
		let propsMap: ObjectMap<Group> = {};

		validate(data, error);

		for (let {id, ...props} of data!) {
			propsMap[id] = props;
		}

		return propsMap;
	}

	async update(object: Group) {

		const {error} = await supabase	
			.from('groups')
			.update({...propsSnakeCasify(object.props)})
			.eq('id', object.id);

		if (error) throw Error(error.message);
	}

	async batchUpdate(ids: Group['id'][], dto: UpdateGroupDto) {

		const {error} = await supabase
			.from('groups')
			.update({...propsSnakeCasify(dto)})
			.in('id', ids);

		if (error) throw Error(error.message);
	}

	async delete(id: number) {

		const {error} = await supabase
			.from('groups')
			.delete()
			.eq('id', id);
		
		if (error) throw Error(error.message);
	}

	async batchDelete(ids: Group['id'][]) {

		const {error} = await supabase
			.from('groups')
			.delete()
			.in('id', ids);

		if (error) throw Error(error.message);
	}
}