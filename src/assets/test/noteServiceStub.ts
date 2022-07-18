import { of } from "rxjs";
import { NoteService } from "src/app/services";

import { testNotes } from 'src/assets/test';

export const noteServiceStub = {
	getAll: () => {
		return of(testNotes)
	}
} as NoteService;