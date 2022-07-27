import { of } from "rxjs";
import { GroupService } from "src/app/services";

import { testGroups } from 'src/assets/test';
import { Group } from 'src/app/model';

export const groupServiceStubBuilder = {
	build: () => {

		let groups: Group[] = testGroups;

		const groupServiceStub = {
			getAll: () => {
				return of(groups);
			}
		} as GroupService;

		return groupServiceStub;
	}
};