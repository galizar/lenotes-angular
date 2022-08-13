import { IsDefined } from 'class-validator';

export class CreateGroupDto {
	@IsDefined()
	name!: string

	@IsDefined()
	isTrashed!: boolean 
}
