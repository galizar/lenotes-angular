import { BehaviorSubject } from "rxjs";
import { AppStateService } from "src/app/services";

export const appStateServiceStubBuilder = {
	build: () => {

		let groupOnDisplayId = new BehaviorSubject<number | undefined>(undefined);
		let noteOnDisplayId = new BehaviorSubject<number | undefined>(undefined);

		const appStateServiceStub = {

			groupOnDisplayId$: groupOnDisplayId.asObservable(),
			noteOnDisplayId$: noteOnDisplayId.asObservable(),

			setGroupOnDisplayId: (id: number) => {
				groupOnDisplayId.next(id);
			},
			setNoteOnDisplayId: (id: number) => {
				noteOnDisplayId.next(id);
			}
		} as AppStateService;

		return appStateServiceStub;
	}
};