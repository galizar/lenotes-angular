import { 
	Controller, 
	Get, 
	Post, 
	Body, 
	Patch, 
	Param, 
	Delete, 
	UsePipes,
	ValidationPipe 
} from '@nestjs/common';

import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from '@lenotes-ng/model';
import { 
	DomainObjectStorage, 
	BatchUpdateDto, 
	CreateGroupDto, 
	ObjectIdsDto 
} from '@lenotes-ng/data-storage';

@Controller('groups')
@UsePipes(
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
	})
)
export class GroupsController {
  constructor(
		private storage: DomainObjectStorage<Group>
		) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
		return this.storage.create(createGroupDto);
  }

  @Get()
  getAll() {
		return this.storage.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
		return this.storage.get(+id);
  }

  @Patch('updateOne/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateGroupDto) {

		const groupProps = await this.storage.get(+id);
		await this.storage.update({id: +id, props: {...groupProps, ...dto}});
  }

	@Patch('batchUpdate')
	batchUpdate(@Body() dto: BatchUpdateDto<UpdateGroupDto>) {
		return this.storage.batchUpdate(dto.ids, dto.subDto);
	
	}

  @Delete(':id')
  remove(@Param('id') id: string) {
		return this.storage.delete(+id);
  }

	@Patch('batchDelete')
	batchDelete(@Body() dto: ObjectIdsDto<Group>) {
		return this.storage.batchDelete(dto.ids);
	}
}
