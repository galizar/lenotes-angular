import { Note } from "./Note";
/** A type that represents a map/dictionary from note id to note properties */
export type NoteMap = Record<Note['id'], Note['props']>;