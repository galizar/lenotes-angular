import { 
	Controller, 
	Get, 
	Post, 
	Body, 
	Patch, 
	Param, 
	Delete, 
	UsePipes, 
	ValidationPipe, 
} from '@nestjs/common';

import { Note } from '@lenotes-ng/model';
import { NotesStorage } from '@lenotes-ng/data-storage';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
	BatchUpdateDto,
	CreateNoteDto,
	ObjectIdsDto
} from '@lenotes-ng/data-storage'

@Controller('notes')
@UsePipes(
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true
	})
)
export class NotesController {
  constructor(
		private storage: NotesStorage
		) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
		return this.storage.create(createNoteDto);
  }

  @Get()
  getAll() {
		return this.storage.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
		return this.storage.get(+id);
  }

	@Get('getInGroup/:id')
	getInGroup(@Param('id') id: string) {
		return this.storage.getInGroup(+id);
	}

  @Patch('updateOne/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
		
		const notesProps = await this.storage.get(+id);
		return this.storage.update({id: +id, props: {...notesProps, ...dto}});
  }

	@Patch('batchUpdate')
	batchUpdate(@Body() dto: BatchUpdateDto<UpdateNoteDto>) {
		return this.storage.batchUpdate(dto.ids, dto.subDto);
	}

	@Patch('trashInGroups')
	trashInGroups(@Body() dto: ObjectIdsDto<Note>) {
		return this.storage.trashInGroups(dto.ids);
	}

	@Patch('restoreInGroups')
	restoreInGroups(@Body() dto: ObjectIdsDto<Note>) {
		return this.storage.restoreInGroups(dto.ids);
	}

  @Delete(':id')
  remove(@Param('id') id: string) {
		return this.storage.delete(+id);
  }

	@Patch('batchDelete')
	batchDelete(@Body() dto: ObjectIdsDto<Note>) {
		return this.storage.batchDelete(dto.ids);
	}
}
