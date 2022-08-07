import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { GroupsController } from './groups/groups.controller';
import { GroupsModule } from './groups/groups.module';
import { NotesModule } from './notes/notes.module';
import { NotesController } from './notes/notes.controller';

@Module({
  imports: [GroupsModule, NotesModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
