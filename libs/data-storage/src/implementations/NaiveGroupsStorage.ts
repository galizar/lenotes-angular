import { DomainObjectStorage } from "../index";
import { Group } from "@lenotes-ng/model";
import { testGroups } from "@lenotes-ng/model";

export class NaiveGroupsStorage extends DomainObjectStorage<Group> {

	private groups: Group[] = testGroups;

	private idPk = testGroups.reduce((prev, curr) => {
		if (prev.id > curr.id)
			return prev;
		else
			return curr;
	}).id;

	create(object: Group) {

		this.idPk++;
		const newGroup = {
			...object,
			id: (() => this.idPk)() // set correct id. new objects have a dummy id.
		};
		this.groups = [...this.groups, newGroup];
		return newGroup.id;
	}

	get(id: number) {
		
		const group = this.groups.find(g => g.id === id);
		if (group === undefined) {
			throw Error('group not found');
		}
		return group;
	}

	getAll(): Group[] {
		return this.groups;
	}

	update(object: Group): void {

		this.groups = this.groups.map(group => {
			if (group.id === object.id) {
				return object;
			} else {
				return group;
			}
		});
	}

	delete(id: number): void {

		this.get(id); // throws error if group doesn't exist
		this.groups = this.groups.filter(group => group.id !== id);
	}
}