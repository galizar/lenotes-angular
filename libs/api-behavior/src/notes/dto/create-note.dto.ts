import { IsDefined } from 'class-validator';

export class CreateNoteDto {
	@IsDefined()
	name!: string;

	@IsDefined()
	content!: string;

	@IsDefined()
	groupId!: number;

	@IsDefined()
	isTrashed!: boolean;
}