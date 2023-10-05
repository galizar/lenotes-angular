import { IsDefined, IsOptional } from 'class-validator';

import { DomainObject, ObjectId } from "@lenotes-ng/model";

export class CreateGroupDto {
	@IsDefined()
	name!: string;

	@IsDefined()
	isTrashed!: boolean;
}

export class UpdateGroupDto implements Partial<CreateGroupDto> {}

export class CreateNoteDto {
	@IsDefined()
	name!: string;

	@IsDefined()
	content!: string;

	@IsOptional()
	groupId?: number;

	@IsDefined()
	isTrashed!: boolean;
}

export class UpdateNoteDto implements Partial<CreateNoteDto> { }

export class ObjectIdsDto<T extends DomainObject> {

	@IsDefined()
	ids!: Array<ObjectId<T>>;
}

/** A DTO that contains ids of objects to update together with a sub-dto that
 * specifies the actual property and value to update */
export class BatchUpdateDto<SubDto> {
	@IsDefined()
	ids!: number[];

	@IsDefined()
	subDto!: SubDto;
}
