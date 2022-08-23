import { CreateNoteDto, UpdateNoteDto, BatchUpdateDto } from '../index';
import { Note } from '@lenotes-ng/model';

export interface IApiNotesService {
	create(dto: CreateNoteDto): number;
	get(id: number): Note;
	getInGroup(groupId: number): Note[];
	getAll(): Note[];
	update(id: number, dto: UpdateNoteDto): void;
	batchUpdate(dto: BatchUpdateDto<UpdateNoteDto>): void;
	delete(id: number): void;
}