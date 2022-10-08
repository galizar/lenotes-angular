import { Note, Group, ObjectMap } from "@lenotes-ng/model";
import { DomainObjectStorage } from "./DomainObjectStorage";

export abstract class NotesStorage extends DomainObjectStorage<Note> {

	abstract getInGroup(id: Group['id']): Promise<ObjectMap<Note>>;
	/** This method trashes notes contained within the given groups. It is provided to
	 *  avoid too many API calls */
	abstract trashInGroups(ids: Group['id'][]): Promise<void>;
	abstract restoreInGroups(ids: Group['id'][]): Promise<void>;
}
