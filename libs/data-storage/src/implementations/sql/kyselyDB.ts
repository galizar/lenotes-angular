import { ColumnType } from 'kysely';

// thanks kysely-codegen :)
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Groups {
  group_id: Generated<number>;
  name: string | null;
  is_trashed: boolean | null;
}

export interface Notes {
  note_id: Generated<number>;
  name: string | null;
  group_id: number | null;
  content: string | null;
  is_trashed: boolean | null;
}

export interface DB {
  groups: Groups;
  notes: Notes;
}