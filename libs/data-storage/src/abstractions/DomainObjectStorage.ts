import { 
	DomainObject, 
	ObjectId, 
	ObjectMap, 
	ObjectProps 
} from '@lenotes-ng/model';

export abstract class DomainObjectStorage<T extends DomainObject> {
	abstract create(withProps: T['props']): Promise<ObjectId<T>>;

	abstract get(id: ObjectId<T>): Promise<ObjectProps<T>>;      
	abstract getAll(): Promise<ObjectMap<T>>;

	abstract update(object: T):	Promise<void>;
	abstract batchUpdate(ids: ObjectId<T>[], dto: Partial<ObjectProps<T>>): Promise<void>;

	abstract delete(id: T['id']): Promise<void>;
	abstract batchDelete(ids: Array<ObjectId<T>>): Promise<void>;
}
