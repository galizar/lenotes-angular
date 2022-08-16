import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';

import { DomainObjectStorage, NaiveNotesStorage } from '@lenotes-ng/data-storage';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
				NotesService,
				{
					provide: DomainObjectStorage,
					useValue: new NaiveNotesStorage()
				}
			],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
