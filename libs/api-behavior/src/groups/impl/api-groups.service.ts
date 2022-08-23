import { Group, GroupProps } from "@lenotes-ng/model";
import { DomainObjectStorage } from "@lenotes-ng/data-storage";
import { IApiGroupsService } from "../../index";
import { CreateGroupDto, UpdateGroupDto, BatchUpdateDto } from "../../index";

export class ApiGroupsService implements IApiGroupsService {

	constructor(
		private storage: DomainObjectStorage<Group>
	) {}

  create(createGroupDto: CreateGroupDto) {

		const withProps = createGroupDto;
		return this.storage.create(withProps);
  }

  getAll() {
		return this.storage.getAll();
  }

  get(id: number): GroupProps {
		return this.storage.get(id);
  }

  update(id: number, dto: UpdateGroupDto) {

		const groupProps = this.get(id);
		this.storage.update({id, props: {...groupProps, ...dto}});
  }

	batchUpdate(dto: BatchUpdateDto<UpdateGroupDto>) {
		this.storage.batchUpdate(dto.ids, dto.subDto);
	}

  delete(id: number) {
		this.storage.delete(id);
  }
}