import { IApiNotesService } from "../../index";
import { CreateNoteDto, UpdateNoteDto, BatchUpdateDto } from '../../index';
import { DomainObjectStorage } from "@lenotes-ng/data-storage";
import { Note, NoteProps, NoteMap } from "@lenotes-ng/model";

export class ApiNotesService implements IApiNotesService {

	constructor(
		private storage: DomainObjectStorage<Note>
	) {}

  create(dto: CreateNoteDto) {

		const withProps = dto;
		return this.storage.create(withProps);
  }

  getAll(): NoteMap {
		return this.storage.getAll();
  }

  get(id: number): NoteProps {
		return this.storage.get(id);
  }

	getInGroup(groupId: number): NoteMap {

		let notesInGroup: NoteMap = Object.create(null);

		for (const [id, props] of Object.entries(this.storage.getAll())) {
			if (props.groupId === groupId) {
				notesInGroup[+id] = props;
			}
		}
		return notesInGroup;
	}

	update(id: number, dto: UpdateNoteDto) {

		const noteProps = this.get(id);
		this.storage.update({id, props: {...noteProps, ...dto}});
	}

	batchUpdate(dto: BatchUpdateDto<UpdateNoteDto>) {
		this.storage.batchUpdate(dto.ids, dto.subDto);
	}

	delete(id: number): void {
		this.storage.delete(id);
	}
}