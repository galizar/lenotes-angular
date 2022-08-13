import { IsDefined } from "class-validator";

export class CreateNoteDto {
	@IsDefined()
	name!: string;

	@IsDefined()
	groupId!: number;

	@IsDefined()
	content!: string;

	@IsDefined()
	isTrashed!: boolean;
}
