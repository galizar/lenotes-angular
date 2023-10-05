import { of, throwError } from "rxjs";

import { GroupService } from "../../app/groups/services/group.service";
import { IGroupService } from "../../app/interfaces";
import { CreateGroupDto, UpdateGroupDto } from "@lenotes-ng/data-storage";
import { Group, testGroups, ObjectMap } from '@lenotes-ng/model';

export const groupServiceStubBuilder = {
	build: () => {

		let groups: ObjectMap<Group> = testGroups; // state initialization

		let idPk = Number(Object.keys(testGroups).reduce((a, b) => {
			if (a > b)
				return a;
			else
				return b;
		})[0]);

		const groupserviceStub: IGroupService = {
			create: (withProps: CreateGroupDto) => {
				const id = ++idPk;
				groups[id] = withProps
				return of(id);
			},
			get: (id: Group['id']) => {
				const props = groups[id];
				if (props === undefined) {
					return throwError(() => { throw Error('Not found') });
				}
				return of(props);
			},
			getAll: () => {
				return of(groups);
			},
			update: (id: Group['id'], dto: UpdateGroupDto) => {
				groups[id] = {...groups[id], ...dto};
				return of({});
			},
			batchUpdate: (ids: Group['id'][], dto: UpdateGroupDto) => {
				for (const id of ids) {
					for (let prop of Object.keys(dto) as Array<keyof UpdateGroupDto>) {
						groups[id][prop] = dto[prop];
					};
				}
				return of({});
			},
			delete: (id: Group['id']) => {
				delete groups[id];
				return of({});
			}
		}
		return groupserviceStub as GroupService;
	}
};