import { CreateNoteDto } from "@lenotes-ng/api-behavior";
import { PartialType } from "@nestjs/mapped-types";

// need to use the PartialType function to inherit too the validation decorators
// for whitelisting
export class UpdateNoteDto extends PartialType(CreateNoteDto) {}