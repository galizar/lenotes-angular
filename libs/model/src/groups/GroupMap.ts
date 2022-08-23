import { Group } from "./Group";

/** A type that represents a map/dictionary from group id to group properties */
export type GroupMap = Record<number, Group['id']>;