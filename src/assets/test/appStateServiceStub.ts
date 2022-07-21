import { BehaviorSubject } from "rxjs";
import { AppStateService } from "src/app/services";

let groupOnDisplayId = new BehaviorSubject<number | undefined>(undefined);
let noteOnDisplayId = new BehaviorSubject<number | undefined>(undefined);

export const appStateServiceStub = {

	groupOnDisplayId$: groupOnDisplayId.asObservable(),
	noteOnDisplayId$: noteOnDisplayId.asObservable(),

	setGroupOnDisplayId: (id: number) => {
		groupOnDisplayId.next(id);
	},
	setNoteOnDisplayId: (id: number) => {
		noteOnDisplayId.next(id);
	}
} as AppStateService;