import { of } from "rxjs";
import { GroupService } from "src/app/services";

import { testGroups } from 'src/assets/test';

export const groupServiceStub = {
	getAll: () => {
		return of(testGroups)
	}
} as GroupService;