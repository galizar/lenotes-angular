import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Group } from '@lenotes-ng/model';
import { GroupService } from '../services/group.service';
import { UpdateGroupDto } from '@lenotes-ng/api-behavior';

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

	update(id: number, dto: UpdateGroupDto) {

		this.groupService.update(id, dto).subscribe();

		this.groups = this.groups.map(group => {
			if (group.id === id) {
				return {...group, ...dto};
			} else {
				return group;
			}
		});
		this.state.next(this.groups);
	}

	trash(id: number) {

		this.update(id, {isTrashed: true});
	}

	delete(id: number) {

		this.groupService.delete(id).subscribe();
		this.groups = this.groups.filter(g => g.id !== id);
		this.state.next(this.groups);
	}
}
