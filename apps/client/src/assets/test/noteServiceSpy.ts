import { of } from 'rxjs';
import { testNotes } from '@lenotes-ng/model';

export const noteServiceSpy = jasmine.createSpyObj('NoteService', ['getInGroup', 'getAll']);

// getInGroup returns notes of group with id 0
const notesInGroup = Object.values(testNotes).filter(p => p.groupId === 0);
noteServiceSpy.getInGroup.and.returnValue(of(notesInGroup));
// getAll
noteServiceSpy.getAll.and.returnValue(of(testNotes));
