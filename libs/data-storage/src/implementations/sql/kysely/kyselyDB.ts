import { ColumnType } from 'kysely';

// thanks kysely-codegen :)
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Groups {
  groupId: Generated<number>;
  name: string | null;
  isTrashed: boolean | null;
}

export interface Notes {
  noteId: Generated<number>;
  name: string | null;
  groupId: number | null;
  content: string | null;
  isTrashed: boolean | null;
}

export interface DB {
  groups: Groups;
  notes: Notes;
}