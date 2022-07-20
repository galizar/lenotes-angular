import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

interface AppState {
	noteOnDisplayId?: number,
	groupOnDisplayId?: number,
}

// initialize state
let _state: AppState = {
	noteOnDisplayId: undefined,
	groupOnDisplayId: undefined 
}

@Injectable({
	providedIn: 'root'
})
export class AppStateService {

	private store = new BehaviorSubject<AppState>(_state);
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
		this.updateState({ ..._state, groupOnDisplayId: id });
  }

	setNoteOnDisplayId(id: number) {
    this.updateState({ ..._state, noteOnDisplayId: id });
	}

	private updateState(state: AppState) {
		this.store.next((_state = state));
	}
}