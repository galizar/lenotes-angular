import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { EditorStateService } from "../editor/services/editor-state.service";

interface AppState {
	noteOnDisplayId?: number,
	groupOnDisplayId?: number,
	displayingTrash: boolean
}

@Injectable({
	providedIn: 'root'
})
export class AppStateService {

	private state: AppState = {
		noteOnDisplayId: undefined,
		groupOnDisplayId: undefined,
		displayingTrash: false
	}

	private store = new BehaviorSubject<AppState>(this.state);
	private state$ = this.store.asObservable();

	constructor() {}

	groupOnDisplayId$ = this.getStateProperty$('groupOnDisplayId');
	noteOnDisplayId$ = this.getStateProperty$('noteOnDisplayId');
	displayingTrash$ = this.getStateProperty$('displayingTrash');

	setGroupOnDisplayId(id?: number) {
		this.updateState({ ...this.state, groupOnDisplayId: id });
  }

	setNoteOnDisplayId(id: number) {
    this.updateState({ ...this.state, noteOnDisplayId: id });
	} 

	toggleDisplayingTrash() {
		this.updateState({ 
			...this.state, 
			displayingTrash: !this.state.displayingTrash,
			groupOnDisplayId: undefined,
			noteOnDisplayId: undefined
		});
	}

	private getStateProperty$<P extends keyof AppState>(prop: P): Observable<AppState[P]> {
		return this.state$.pipe(
			map(state => state[prop]),
			distinctUntilChanged()
		);
	}

	private updateState(state: AppState) {
		this.store.next((this.state = state));
	}
}