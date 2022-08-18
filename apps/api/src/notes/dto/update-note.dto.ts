import { CreateNoteDto } from "@lenotes-ng/api-behavior";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}