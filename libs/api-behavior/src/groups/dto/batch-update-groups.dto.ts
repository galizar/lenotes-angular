import { IsDefined } from "class-validator";
import { UpdateGroupDto } from "./update-group.dto";

export class BatchUpdateGroupsDto {
	@IsDefined()
	ids!: number[];

	@IsDefined()
	subDto!: object;
}