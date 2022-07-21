import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { AppState } from 'src/app/model';

@Injectable({
	providedIn: 'root'
})
export class AppStateService {

	private state: AppState = {
		noteOnDisplayId: undefined,
		groupOnDisplayId: undefined
	}

	private store = new BehaviorSubject<AppState>(this.state);
	private state$ = this.store.asObservable();

	constructor() {}

	groupOnDisplayId$ = this.state$.pipe(
		map(state => state.groupOnDisplayId),
		distinctUntilChanged()
	);

	noteOnDisplayId$ = this.state$.pipe(
		map(state => state.noteOnDisplayId),
		distinctUntilChanged()
	);

	setGroupOnDisplayId(id: number) {
		this.updateState({ ...this.state, groupOnDisplayId: id });
  }

	setNoteOnDisplayId(id: number) {
    this.updateState({ ...this.state, noteOnDisplayId: id });
	}

	private updateState(state: AppState) {
		this.store.next((this.state = state));
	}
}