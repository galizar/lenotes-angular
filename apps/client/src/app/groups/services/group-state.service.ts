import { Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { Group } from '@lenotes-ng/model';
import { GroupService } from '../services/group.service';

@Injectable({
  providedIn: 'root'
})
export class GroupStateService {

	private groups: Group[] = [];
	private state = new BehaviorSubject<Group[]>(this.groups);
	public groups$ = this.state.asObservable();

  constructor(
		private groupService: GroupService,
	) { 
		groupService.getAll().subscribe(groups => {
			this.state.next((this.groups = groups));
		});
	}

	create(name: string) {

		const dto = {name, isTrashed: false};
		this.groupService.create(dto).subscribe(id => {
			const newGroup = { ...dto, id };
			this.groups = [...this.groups, newGroup];
			this.state.next(this.groups);
		});
	}

	delete(id: number) {

		this.groupService.delete(id).subscribe();
		this.groups = this.groups.filter(g => g.id !== id);
		this.state.next(this.groups);
	}
}
