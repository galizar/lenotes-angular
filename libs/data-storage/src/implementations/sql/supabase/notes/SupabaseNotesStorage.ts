import { NotesStorage } from "@lenotes-ng/data-storage";
import { Note, Group, ObjectMap } from "@lenotes-ng/model";
import { propsCamelCasify, propsSnakeCasify } from '../util/camelCaseUtilities';
import { supabase } from '../db';
import { validate } from "../util/validate";
import { FromNode } from "kysely";

const propColumns = 'name, content, groupId:group_id, isTrashed:is_trashed';

export class SupabaseNotesStorage extends NotesStorage {

	async create(withProps: Note['props']) {

		const {data, error} = await supabase
			.from('notes')
			.insert({...propsSnakeCasify(withProps)})
			.select().single();

		validate(data, error);

		return data!.id;
	}

	async get(id: number): Promise<Note['props']> {

		const { data, error } = await supabase
			.from('notes')
			.select(propColumns)
			.eq('id', id)
			.single();
		
		validate(data, error);
		
		return {
			...data!,
			groupId: data!.groupId ?? undefined,
		};
	}

	async getAll(): Promise<ObjectMap<Note>> {

		const {data, error} = await supabase
			.from('notes')
			.select(`id, ${propColumns}`);
		
		let propsMap: ObjectMap<Note> = {};

		validate(data, error);

		for (let {id, ...props} of data!) {
			propsMap[id] = {
				...props,
				groupId: props.groupId ?? undefined
			};
		}

		return propsMap;
	}

	async getInGroup(groupId: Group['id']) {

		const {data, error} = await supabase
			.from('notes')
			.select(`id, ${propColumns}`)
			.eq('group_id', groupId);

		validate(data, error);

		let propsMap: ObjectMap<Note> = {};

		for (let {id, ...props} of data!) {
			propsMap[id] = {
				...props,
				groupId: props.groupId ?? undefined
			};
		}

		return propsMap;
	}

	async update(object: Note) {

		const {error} = await supabase	
			.from('notes')
			.update({
				name: object.props.name,
				content: object.props.content,
				group_id: object.props.groupId,
				is_trashed: object.props.isTrashed
			})
			.eq('id', object.id);

		if (error) throw Error(error.message)
	}

	async batchUpdate(ids: Note['id'][], dto: Partial<Note['props']>) {

		const {error} = await supabase
			.from('notes')
			.update({...propsSnakeCasify(dto)})
			.in('id', ids);

		if (error) throw Error(error.message)
	}

	async trashInGroups(ids: Group['id'][]) {
		const {error} = await supabase
			.from('notes')
			.update({'is_trashed': true})
			.in('group_id', ids);

		if (error) throw Error(error.message);
	}

	async restoreInGroups(ids: Group['id'][]) {
		const {error} = await supabase
			.from('notes')
			.update({'is_trashed': false})
			.in('group_id', ids);

		if (error) throw Error(error.message);
	}

	async delete(id: number) {

		const {error} = await supabase
			.from('notes')
			.delete()
			.eq('id', id);
		
		if (error) throw Error(error.message)
	}

	async batchDelete(ids: Note['id'][]): Promise<void> {
		const {error}	= await supabase
			.from('notes')
			.delete()
			.in('id', ids);

		if (error) throw Error(error.message);
	}

}
