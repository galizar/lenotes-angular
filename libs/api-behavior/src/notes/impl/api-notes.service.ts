import { IApiNotesService } from "../../index";
import { CreateNoteDto, UpdateNoteDto, BatchUpdateDto } from '../../index';
import { DomainObjectStorage } from "@lenotes-ng/data-storage";
import { Note } from "@lenotes-ng/model";

export class ApiNotesService implements IApiNotesService {

	constructor(
		private storage: DomainObjectStorage<Note>
	) {}

  create(createNoteDto: CreateNoteDto) {

		const newNote = {
			...createNoteDto,
			id: -1
		};

		return this.storage.create(newNote);
  }

  getAll(): Note[] {
		return this.storage.getAll();
  }

  get(id: number): Note {
		return this.storage.get(id);
  }

	getInGroup(groupId: number): Note[] {
		return this.storage.getAll().filter(note => note.groupId === groupId);
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