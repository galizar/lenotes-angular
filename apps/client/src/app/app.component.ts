import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { AppStateService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lenotes-angular';

	vm$ = combineLatest({
		displayingTrash: this.appStateService.displayingTrash$,
		groupOnDisplayId: this.appStateService.groupOnDisplayId$
	});

	constructor(
		public appStateService: AppStateService
	) {}
}
