import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Group, Note } from './model';
import { testGroups, testNotes } from 'src/assets/test';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const groups: Group[] = testGroups;
		const notes: Note[] = testNotes

    return {groups, notes}
  }
}
