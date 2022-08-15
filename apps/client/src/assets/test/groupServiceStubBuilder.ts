import { of } from "rxjs";
import { GroupService } from "../../app/services";

import { Group } from '@lenotes-ng/model';
import { IGroupService } from "../../app/interfaces";
import { DomainObjectStorage, NaiveGroupsStorage } from "@lenotes-ng/data-storage";
import { CreateGroupDto, UpdateGroupDto } from "@lenotes-ng/api-behavior";

export const groupServiceStubBuilder = {
	build: () => {

		const storage: DomainObjectStorage<Group> = new NaiveGroupsStorage();

		const groupServiceStub: IGroupService = {
			create: (dto: CreateGroupDto) => {
				const newGroup = {
					...dto,
					id: -1 // id will be set by storage service
				};
				return of(storage.create(newGroup));
			},
			getAll: () => {
				return of(storage.getAll());
			},
			get: (id: number) => {
				return of(storage.get(id));
			},
			update: (id: number, dto: UpdateGroupDto) => {
				const groupToUpdate = storage.get(id);
				const updatedGroup = { ...groupToUpdate, ...dto };
				storage.update(updatedGroup);
				return of({});
			},
			delete: (id: number) => {
				storage.delete(id);
				return of({});
			}
		};

		return groupServiceStub as GroupService;
	}
};