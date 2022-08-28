import { Group } from "@lenotes-ng/model";
import { DomainObjectStorage } from "@lenotes-ng/data-storage";
import { IApiGroupsService } from "../../index";
import { CreateGroupDto, UpdateGroupDto, BatchUpdateDto } from "../../index";

export class ApiGroupsService implements IApiGroupsService {

	constructor(
		private storage: DomainObjectStorage<Group>
	) {}

  async create(createGroupDto: CreateGroupDto) {

		const withProps = createGroupDto;
		return await this.storage.create(withProps);
  }

  async getAll() {
		return await this.storage.getAll();
  }

  async get(id: Group['id']) {
		return await this.storage.get(id);
  }

  async update(id: Group['id'], dto: UpdateGroupDto) {

		const groupProps = await this.get(id);
		await this.storage.update({id, props: {...groupProps, ...dto}});
  }

	async batchUpdate(dto: BatchUpdateDto<UpdateGroupDto>) {
		await this.storage.batchUpdate(dto.ids, dto.subDto);
	}

  async delete(id: Group['id']) {
		await this.storage.delete(id);
  }
}