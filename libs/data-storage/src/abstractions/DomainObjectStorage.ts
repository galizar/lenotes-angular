import { Group, Note} from '@lenotes-ng/shared/model';

export type DomainObject = Group | Note;

export abstract class DomainObjectStorage<T extends DomainObject> {
	/** Returns ID of newly created object */
	abstract create(object: T): number; // C
	abstract get(id: number): T;      // R
	abstract getAll(): T[];
	abstract update(object: T): void; // U
	abstract delete(id: number): void;// D
}