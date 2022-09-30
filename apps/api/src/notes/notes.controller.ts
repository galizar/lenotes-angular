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
	Req 
} from '@nestjs/common';
import { Request } from 'express';

import { NotesService } from './services/notes.service';
import { BatchUpdateDto, CreateNoteDto } from '@lenotes-ng/api-behavior';
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.delete(+id);
  }
}
