import { from, of, throwError } from "rxjs";
import { GroupService } from "../../app/groups/services/group.service";

import { IGroupService } from "../../app/interfaces";
import { NaiveGroupsStorage } from "@lenotes-ng/data-storage";
import { CreateGroupDto, UpdateGroupDto, ApiGroupsService } from "@lenotes-ng/api-behavior";

export const groupServiceStubBuilder = {
	build: () => {

		const storage = new NaiveGroupsStorage();
		const apiService = new ApiGroupsService(storage);

		const groupServiceStub: IGroupService = {
			create: (dto: CreateGroupDto) => {

				const idOfNewGroup = apiService.create(dto);
				return from(idOfNewGroup);
			},
			getAll:  () => {
				return from(apiService.getAll());
			},
			get: (id: number) => {
				try {
					return from(storage.get(id));
				} catch (e) {
					return throwError(() => { new Error('Error while getting group'); });
				}
			},
			update: (id: number, dto: UpdateGroupDto) => {
				try {
					apiService.update(id, dto);
					return of({});
				} catch (e) {
					return throwError(() => { new Error('Error while updating group'); });
				}
			},
			delete: (id: number) => {
				try {
					apiService.delete(id);
					return of({});
				} catch (e) {
					return throwError(() => { new Error('Error while deleting group'); });
				}
			}
		};

		return groupServiceStub as GroupService;
	}
};