import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../environments/environment';
import { AppModule } from '../app/app.module';
import { LobbyComponent } from './lobby.component';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../auth/services/auth.service';

@NgModule({
	declarations: [
		LobbyComponent
	],
	imports: [
		AppModule,
		AuthComponent,
		CommonModule
	],
	providers: [ 
		{ provide: 'env', useValue: environment},
		AuthService
	],
	bootstrap: [ LobbyComponent ]
})
export class LobbyModule { }