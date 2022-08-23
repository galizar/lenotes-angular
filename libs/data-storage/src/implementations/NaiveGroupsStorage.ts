import { DomainObjectStorage } from "../index";
import { Group, GroupMap } from "@lenotes-ng/model";
import { testGroups } from "@lenotes-ng/model";
import { UpdateGroupDto } from "@lenotes-ng/api-behavior";

export class NaiveGroupsStorage extends DomainObjectStorage<Group> {

	private groups: GroupMap = testGroups;

	private idPk = Number(Object.keys(testGroups).reduce((a, b) => {
		if (a > b)
			return a;
		else
			return b;
	})[0]);

	create(withProps: Group['props']) {

		const id = ++this.idPk;
		this.groups[id] = withProps;
		return id;
	}

	get(id: number) {
		
		const props = this.groups[id];
		if (props === undefined) throw Error('group not found');
		return props;
	}

	getAll(): GroupMap {
		return this.groups;
	}

	update(obj: Group): void {
		this.groups[obj.id] = obj.props;
	}

	batchUpdate(ids: Group['id'][], dto: UpdateGroupDto): void {

		for (const id of ids) {
			for (let prop of Object.keys(dto) as Array<keyof UpdateGroupDto>) {
				this.groups[id][prop] = dto[prop];
			};
		}
	}

	delete(id: number): void {
		delete this.groups[id];
	}
}