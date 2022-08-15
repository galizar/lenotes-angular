import { Group } from "@lenotes-ng/model";
import { DomainObjectStorage } from "@lenotes-ng/data-storage";
import { IApiGroupsService } from "../../index";
import { CreateGroupDto, UpdateGroupDto } from "../../index";

export class ApiGroupsService implements IApiGroupsService {

	constructor(
		private storage: DomainObjectStorage<Group>
	) {}

  create(createGroupDto: CreateGroupDto) {

		const newGroup = {
			...createGroupDto,
			id: -1 // id will be set by storage service
		};
		return this.storage.create(newGroup);
  }

  getAll() {
		return this.storage.getAll();
  }

  get(id: number): Group {
		return this.storage.get(id);
  }

  update(id: number, dto: UpdateGroupDto) {

		const groupToUpdate = this.get(id);
		const updatedGroup = {...groupToUpdate, ...dto};
		this.storage.update(updatedGroup);
  }

  delete(id: number) {
		this.storage.delete(id);
  }
}