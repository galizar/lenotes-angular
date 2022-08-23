import { IApiNotesService } from "../../index";
import { CreateNoteDto, UpdateNoteDto, BatchUpdateDto } from '../../index';
import { DomainObjectStorage } from "@lenotes-ng/data-storage";
import { Note, NoteMap } from "@lenotes-ng/model";

export class ApiNotesService implements IApiNotesService {

	constructor(
		private storage: DomainObjectStorage<Note>
	) {}

  create(dto: CreateNoteDto) {

		const newNote = {
			id: dto // the storage service sets the actual id
		};
		return this.storage.create(newNote);
  }

  getAll(): NoteMap {
		return this.storage.getAll();
  }

  get(id: number): Note {
		return this.storage.get(id);
  }

	getInGroup(groupId: number): NoteMap {

		let notesInGroup: NoteMap = Object.create(null);

		for (const [id, props] of Object.entries(this.storage.getAll())) {
			if (props.groupId === groupId) {
				notesInGroup[Number(id)] = props;
			}
		}
		return notesInGroup;
	}

	update(id: number, dto: UpdateNoteDto) {

		const noteToUpdate = this.get(id);
		const updatedNote = {...noteToUpdate, ...dto};

		this.storage.update(updatedNote);
	}

	batchUpdate(dto: BatchUpdateDto<UpdateNoteDto>) {
		this.storage.batchUpdate(dto.ids, dto.subDto);
	}

	delete(id: number): void {
		this.storage.delete(id);
	}
}