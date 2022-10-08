import { IApiNotesService } from "../../index";
import { CreateNoteDto, UpdateNoteDto, BatchUpdateDto } from '../../index';
import { NotesStorage } from "@lenotes-ng/data-storage";
import { Note, Group, ObjectMap } from "@lenotes-ng/model";

export class ApiNotesService implements IApiNotesService {

	constructor(
		private storage: NotesStorage 
	) {}

  async create(dto: CreateNoteDto) {

		const withProps = dto;
		return await this.storage.create(withProps);
  }

  async getAll() {
		return await this.storage.getAll();
  }

  async get(id: Note['id']) {
		return await this.storage.get(id);
  }

	async getInGroup(groupId: Group['id']) {
		return await this.storage.getInGroup(groupId);
	}

	async update(id: Note['id'], dto: UpdateNoteDto) {

		const noteProps = await this.get(id);
		await this.storage.update({id, props: {...noteProps, ...dto}});
	}

	async batchUpdate(dto: BatchUpdateDto<UpdateNoteDto>) {
		await this.storage.batchUpdate(dto.ids, dto.subDto);
	}

	async delete(id: Note['id']) {
		await this.storage.delete(id);
	}

	async batchDelete(ids: Note['id'][]) {
		await this.storage.batchDelete(ids);
	}

	async trashInGroups(ids: Group['id'][]) {
		await this.storage.trashInGroups(ids);
	}

	async restoreInGroups(ids: Group['id'][]) {
		await this.storage.restoreInGroups(ids);
	}
}
