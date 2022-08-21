import { IsDefined, IsOptional } from 'class-validator';

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