import { IsDefined } from "class-validator";

/** A DTO that contains ids of objects to update together with a sub-dto that
 * specifies the actual property and value to update */
export class BatchUpdateDto<SubDto> {
	@IsDefined()
	ids!: number[];

	@IsDefined()
	subDto!: SubDto;
}