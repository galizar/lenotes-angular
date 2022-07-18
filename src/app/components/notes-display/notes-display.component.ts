import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { NoteService } from '../../services/note.service';

import { Note } from '../../model';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

	@Input() groupOnDisplayId?: number;
	@Input() noteOnDisplayId?: number;
	@Output() setNoteOnDisplayIdEvent = new EventEmitter<number>();

  notes: Note[] = [];

  constructor(private service: NoteService) { }

  ngOnInit(): void {
		this.service.getAll()
			.subscribe(notes => this.notes = notes);
  }

	setNoteOnDisplayId(id: number): void {
		this.setNoteOnDisplayIdEvent.emit(id);
		console.log('triggered setNoteOnDisplayId');
	}

	drag(event: DragEvent, note: Note): void {
		event.dataTransfer?.setData('Note', JSON.stringify(note));
	}
}
