import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsDisplayComponent } from './groups/display/groups-display.component';
import { NotesDisplayComponent } from './notes/display/notes-display.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupsDisplayComponent,
    NotesDisplayComponent,
    EditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
		ReactiveFormsModule
  ],
  providers: [
		{provide: 'env', useValue: environment}
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
