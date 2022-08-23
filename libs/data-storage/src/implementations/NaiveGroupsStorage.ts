import { DomainObjectStorage } from "../index";
import { Group } from "@lenotes-ng/model";
import { testGroups } from "@lenotes-ng/model";
import { UpdateGroupDto } from "@lenotes-ng/api-behavior";

export class NaiveGroupsStorage extends DomainObjectStorage<Group> {

	private groups: Record<number, Group['id']> = testGroups;

	private idPk = Number(Object.keys(testGroups).reduce((a, b) => {
		if (a > b)
			return a;
		else
			return b;
	})[0]);

	create(obj: Group) {

		this.idPk++;
		const value = Object.values(obj);
		const newGroup = {
			[this.idPk]: {
				...value[0]
			}
		};
		this.groups = {...this.groups, ...newGroup};
		return this.idPk;
	}

	get(id: number) {
		
		const groupProps = this.groups[id];
		if (groupProps === undefined) {
			throw Error('group not found');
		}
		return {id: groupProps};
	}

	getAll(): Record<number, Group['id']> {
		return this.groups;
	}

	update(obj: Group): void {

		const id = Number(Object.keys(obj)[0]);
		const props = Object.values(obj)[0] as Group['id'];
		this.groups[id] = props;
	}

	batchUpdate(ids: number[], dto: UpdateGroupDto): void {

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