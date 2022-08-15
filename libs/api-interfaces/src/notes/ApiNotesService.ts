import { CreateNoteDto, UpdateNoteDto } from './dto';
import { Note } from '@lenotes-ng/model';

interface ApiNotesService {
	create(dto: CreateNoteDto): number;
	get(id: number): Note;
	getAll(): Note[];
	update(id: number, dto: UpdateNoteDto): void;
	delete(id: number): void;
}