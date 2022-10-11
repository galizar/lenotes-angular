import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsDisplayComponent } from './groups/groups-display.component';
import { NotesDisplayComponent } from './notes/notes-display.component';
import { EditorComponent } from './editor/editor.component';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';

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
		ReactiveFormsModule,
		FormsModule
  ],
	exports: [
		AppComponent
	],
  providers: [
		// {provide: 'env', useValue: environment},
		// {
			// provide: HTTP_INTERCEPTORS, 
			// useClass: AuthInterceptor, 
			// multi: true,
		// }
	],
})
export class AppModule { }
