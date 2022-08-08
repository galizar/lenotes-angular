import { of } from "rxjs";
import { GroupService } from "../../app/services";

import { testGroups } from '.';
import { Group } from '@lenotes-ng/shared-model';

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