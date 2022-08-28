import { Group, Note } from './index';

export type DomainObject = Group | Note;

export type ObjectId<T extends DomainObject> = T['id'];
export type ObjectProps<T extends DomainObject> = T['props'];
/** A map from domain object ids to properties */
export type ObjectMap<T extends DomainObject> = Record<ObjectId<T>, ObjectProps<T>>;