import { createClient } from "@supabase/supabase-js";

import { DomainObjectStorage } from "@lenotes-ng/data-storage";
import { Note } from "@lenotes-ng/model";
import { Database } from '../schema';
import { UpdateNoteDto } from "@lenotes-ng/api-behavior";
import { propsCamelCasify, propsSnakeCasify } from '../util/camelCaseUtilities';

type note = Database['public']['Tables']['notes']['Row'];
const propColumns = 'name, content, group_id, is_trashed';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export class SupabaseNotesStorage extends DomainObjectStorage<Note> {

	async create(withProps: Note['props']) {

		const session = await supabase.auth.session();

		setImmediate(() => {
			if (session === null || session.access_token === undefined) {
				throw Error('no user is signed in');
			}
		});

		const {user} = await supabase.auth.api.getUser(session?.access_token!);

		const {data, error} = await supabase
			.from<note>('notes')
			.insert({...propsSnakeCasify(withProps), user_id: user!.id});

		if (error) throw Error(error.message);

		return data![0].id;
	}

	async get(id: number): Promise<Note['props']> {

		const {data, error} = await supabase
			.from<note>('notes')
			.select(propColumns)
			.eq('id', id);
		
		if (error) throw Error(error.message);

		if (data === null || data.length === 0) {
			throw Error('not found');
		}

		const note = data[0];
		return propsCamelCasify(note);
	}

	async getAll() {

		const {data, error} = await supabase
			.from<note>('notes')
			.select(propColumns);
		
		if (error) throw Error(error.message);

		return propsCamelCasify(data);
	}

	async update(object: Note) {

		const {error} = await supabase	
			.from<note>('notes')
			.update({...propsSnakeCasify(object.props)}, {returning: 'minimal'})
			.eq('id', object.id);

		if (error) throw Error(error.message);
	}

	async batchUpdate(ids: Note['id'][], dto: UpdateNoteDto) {

		const {error} = await supabase
			.from<note>('notes')
			.update({...propsSnakeCasify(dto)}, {returning: 'minimal'})
			.in('id', ids);

		if (error) throw Error(error.message);
	}

	async delete(id: number) {

		const {error} = await supabase
			.from<note>('notes')
			.delete({returning: 'minimal'})
			.eq('id', id);
		
		if (error) throw Error(error.message);
	}
}