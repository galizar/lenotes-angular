import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lenotes-angular';
	groupOnDisplayId?: number;
	noteOnDisplayId?: number;

	setGroupOnDisplayId(id: number) {
		console.log('setGroupOnDisplayId in app component was called with id:', id);
		this.groupOnDisplayId = id;
	}

	setNoteOnDisplayId(id: number) {
		console.log('setNoteOnDisplayId in app component was called with id:', id);
		this.noteOnDisplayId = id;
	}
}
