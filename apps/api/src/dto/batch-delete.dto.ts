import { IsDefined } from 'class-validator';
import { DomainObject, ObjectId } from "@lenotes-ng/model";

export class BatchDeleteDto<T extends DomainObject> {

	@IsDefined()
	ids!: Array<ObjectId<T>>;
}