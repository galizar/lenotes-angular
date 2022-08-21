import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AppStateService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lenotes-angular';

	vm$ = combineLatest([
		this.appStateService.displayingTrash$,
		this.appStateService.groupOnDisplayId$
	]).pipe(
		map((props) => {
			return {
				displayingTrash: props[0],
				groupOnDisplayId: props[1]
			};
		})
	)

	constructor(
		public appStateService: AppStateService
	) {}
}
