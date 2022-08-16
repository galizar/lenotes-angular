import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import { CreateGroupDto, UpdateGroupDto } from '@lenotes-ng/api-behavior';

@Controller('groups')
@UsePipes(
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.delete(+id);
  }
}
