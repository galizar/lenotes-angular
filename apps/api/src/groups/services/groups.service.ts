import { Injectable } from '@nestjs/common';

import { ApiGroupsService } from '@lenotes-ng/api-behavior';
import { DomainObjectStorage } from '@lenotes-ng/data-storage';
import { Group } from '@lenotes-ng/model';

@Injectable()
export class GroupsService extends ApiGroupsService {

	constructor(storage: DomainObjectStorage<Group>) {
		super(storage);
	}
}
