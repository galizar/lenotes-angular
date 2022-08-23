import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import { BatchUpdateDto, CreateGroupDto, BatchUpdateGroupsDto } from '@lenotes-ng/api-behavior';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
@UsePipes(
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
	})
)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  getAll() {
    return this.groupsService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.groupsService.get(+id);
  }

  @Patch('updateOne/:id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
		console.log(updateGroupDto)
    return this.groupsService.update(+id, updateGroupDto);
  }

	@Patch('batchUpdate')
	batchUpdate(@Body() dto: BatchUpdateGroupsDto) {
		console.log('batch update handler called');
		console.log(dto);
		return this.groupsService.batchUpdate(dto);
	}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.delete(+id);
  }
}
