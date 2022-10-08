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

import { BatchUpdateDto, CreateNoteDto, ObjectIdsDto } from '@lenotes-ng/api-behavior';
import { Note } from '@lenotes-ng/model';
import { NotesService } from './services/notes.service';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
@UsePipes(
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true
	})
)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  getAll() {
    return this.notesService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.notesService.get(+id);
  }

	@Get('getInGroup/:id')
	getInGroup(@Param('id') id: string) {
		return this.notesService.getInGroup(+id);
	}

  @Patch('updateOne/:id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

	@Patch('batchUpdate')
	batchUpdate(@Body() dto: BatchUpdateDto<UpdateNoteDto>) {
		return this.notesService.batchUpdate(dto);
	}

	@Patch('trashInGroups')
	trashInGroups(@Body() dto: ObjectIdsDto<Note>) {
		return this.notesService.trashInGroups(dto.ids);
	}

	@Patch('restoreInGroups')
	restoreInGroups(@Body() dto: ObjectIdsDto<Note>) {
		return this.notesService.restoreInGroups(dto.ids);
	}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.delete(+id);
  }

	@Patch('batchDelete')
	batchDelete(@Body() dto: ObjectIdsDto<Note>) {
		return this.notesService.batchDelete(dto.ids);
	}
	
}
