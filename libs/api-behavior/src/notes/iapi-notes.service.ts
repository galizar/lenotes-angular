import { CreateNoteDto, UpdateNoteDto, BatchUpdateDto } from '../index';
import { NoteProps, NoteMap } from '@lenotes-ng/model';

export interface IApiNotesService {
	create(dto: CreateNoteDto): number;
	get(id: number): NoteProps;
	getInGroup(groupId: number): NoteMap;
	getAll(): NoteMap;
	update(id: number, dto: UpdateNoteDto): void;
	batchUpdate(dto: BatchUpdateDto<UpdateNoteDto>): void;
	delete(id: number): void;
}