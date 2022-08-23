import { CreateNoteDto, UpdateNoteDto, BatchUpdateDto } from '../index';
import { Note, NoteMap } from '@lenotes-ng/model';

export interface IApiNotesService {
	create(dto: CreateNoteDto): number;
	get(id: number): Note;
	getInGroup(groupId: number): NoteMap;
	getAll(): NoteMap;
	update(id: number, dto: UpdateNoteDto): void;
	batchUpdate(dto: BatchUpdateDto<UpdateNoteDto>): void;
	delete(id: number): void;
}