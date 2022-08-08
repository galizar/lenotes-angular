import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Group } from '@lenotes-ng/shared-model';
import { GroupService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class GroupStateService {

	private state = new BehaviorSubject<Group[]>([]);
	public groups$ = this.state.asObservable();

  constructor(
		private groupService: GroupService,
	) { 
		groupService.getAll().subscribe(groups => {
			this.state.next(groups);
		});
	}
}
