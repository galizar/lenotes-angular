import { DomainObjectStorage, supabase } from "@lenotes-ng/data-storage";
import { Group } from "@lenotes-ng/model";

export class SupabaseGroupsStorage extends DomainObjectStorage<Group> {

	//async create(withProps: Group['props']) {

	//	const user = supabase.auth.user();

	//	const {data, error} = await supabase
	//		.from('groups')
	//		.insert({...withProps, user_id: user!.id});

	//}
}