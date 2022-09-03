import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AppModule } from '../app/app.module';
import { LobbyComponent } from './lobby.component';
import { AuthComponent } from '../auth/auth.component';

@NgModule({
	declarations: [
		LobbyComponent
	],
	imports: [
		AppModule,
		AuthComponent
	],
	providers: [ 
		{ provide: 'env', useValue: environment}
	],
	bootstrap: [ LobbyComponent ]
})
export class LobbyModule { }