import { DomainObject } from '@lenotes-ng/model';

export abstract class DomainObjectStorage<T extends DomainObject> {
	abstract create(withProps: T['props']): T['id']; // C
	abstract get(id: T['id']): T['props'];      // R
	abstract getAll(): Record<T['id'], T['props']>;
	abstract update(object: T): void; // U
	abstract batchUpdate(ids: Array<T['id']>, dto: Partial<T['props']>): void;
	abstract delete(id: T['id']): void;// D
}