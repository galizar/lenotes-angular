import { CreateGroupDto } from '@lenotes-ng/api-behavior';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}