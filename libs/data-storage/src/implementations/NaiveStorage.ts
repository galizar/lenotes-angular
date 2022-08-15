import { Group, Note, DomainObject } from "@lenotes-ng/model";
import { testGroups, testNotes } from "@lenotes-ng/model";
import { DomainObjectStorage } from "../index";

/** A class that uses plain objects for storage. Generalized to work with all
 * DomainObjects. It would probably need to use the Repository Pattern or
 * something alike */
export class NaiveStorage implements DomainObjectStorage<DomainObject> {

	private groups: Group[] = (() => testGroups)();
	private notes: Note[] = (() => testNotes)();

	create(object: DomainObject): number {
		throw Error('Not implemented');
	}

	get(id: number): DomainObject {
		throw Error('Not implemented');
	}

	getAll(): DomainObject[] {
		throw Error('Not implemented');
	}

	update(object: DomainObject): void {
		throw Error('Not implemented');
	}

	delete(id: number): void {
		throw Error('Not implemented');
	}
}