import { DomainObject } from '@lenotes-ng/model';

export abstract class DomainObjectStorage<T extends DomainObject> {
	/** Returns ID of newly created object */
	abstract create(object: T): number; // C
	abstract get(id: number): T;      // R
	abstract getAll(): Record<number, T['id']>;
	abstract update(object: T): void; // U
	abstract batchUpdate(ids: number[], dto: Partial<T>): void;
	abstract delete(id: number): void;// D
}