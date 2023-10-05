import { DomainObjectStorage } from "../../index";
import { Group, ObjectMap } from "@lenotes-ng/model";
import { testGroups } from "@lenotes-ng/model";
import { UpdateGroupDto } from "@lenotes-ng/data-storage";

export class NaiveGroupsStorage extends DomainObjectStorage<Group> {

	private groups: ObjectMap<Group> = testGroups;

	private idPk = Number(Object.keys(testGroups).reduce((a, b) => {
		if (a > b)
			return a;
		else
			return b;
	})[0]);

	async create(withProps: Group['props']) {

		const id = ++this.idPk;
		this.groups[id] = withProps;
		return id;
	}

	async get(id: Group['id']) {

		const props = await this.groups[id];
		if (props === undefined) throw Error('group not found');
		return props;
	}

	async getAll() {
		return this.groups;
	}

	async update(obj: Group) {
		this.groups[obj.id] = obj.props;
	}

	async batchUpdate(ids: Group['id'][], dto: UpdateGroupDto) {

		for (const id of ids) {
			for (let prop of Object.keys(dto) as Array<keyof UpdateGroupDto>) {
				this.groups[id][prop] = dto[prop];
			};
		}
	}

	async delete(id: Group['id']) {
		delete this.groups[id];
	}

	async batchDelete(ids: Group['id'][]) {
		for (const id of ids) {
			delete this.groups[id];
		}
	}
}
