import { IsDefined } from 'class-validator';
import { DomainObject, ObjectId } from "@lenotes-ng/model";

export class ObjectIdsDto<T extends DomainObject> {

	@IsDefined()
	ids!: Array<ObjectId<T>>;
}