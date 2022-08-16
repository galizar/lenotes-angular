import { of, throwError } from "rxjs";
import { GroupService } from "../../app/services";

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
				return of(idOfNewGroup);
			},
			getAll: () => {
				return of(apiService.getAll());
			},
			get: (id: number) => {
				try {
					return of(storage.get(id));
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