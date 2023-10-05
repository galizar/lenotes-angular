import { CreateGroupDto } from '@lenotes-ng/data-storage';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}