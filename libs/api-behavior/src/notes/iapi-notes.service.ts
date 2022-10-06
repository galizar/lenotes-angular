import { CreateNoteDto, UpdateNoteDto, BatchUpdateDto } from '../index';
import { Note, Group, ObjectMap } from '@lenotes-ng/model';

export interface IApiNotesService {
	create(dto: CreateNoteDto): Promise<Note['id']>;
	get(id: Note['id']): Promise<Note['props']>;
	getInGroup(groupId: Group['id']): Promise<ObjectMap<Note>>;
	getAll(): Promise<ObjectMap<Note>>;
	update(id: Note['id'], dto: UpdateNoteDto): Promise<void>;
	batchUpdate(dto: BatchUpdateDto<UpdateNoteDto>): Promise<void>;
	delete(id: Note['id']): Promise<void>;
	batchDelete(ids: Array<Note['id']>): Promise<void>;
}