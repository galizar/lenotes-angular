import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Group, ObjectMap } from '@lenotes-ng/model';
import { GroupService } from '../services/group.service';
import { UpdateGroupDto } from '@lenotes-ng/api-behavior';

@Injectable({
  providedIn: 'root'
})
export class GroupStateService {

	private groups: ObjectMap<Group> = Object.create(null);
	private state = new BehaviorSubject<ObjectMap<Group>>(this.groups);
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
			this.groups[id] = dto;
			this.state.next(this.groups);
		});
	}

	update(id: Group['id'], dto: UpdateGroupDto) {

		this.groups[id] = { ...this.groups[id], ...dto};
		this.state.next(this.groups);
		this.groupService.update(id, dto).subscribe();
	}

	batchUpdate(ids: Group['id'][], dto: UpdateGroupDto) {

		for (const id of ids) {
			for (const prop of Object.keys(dto) as Array<keyof UpdateGroupDto>) {
				this.groups[id][prop] = dto[prop];
			}
		}
		this.state.next(this.groups);
		this.groupService.batchUpdate(ids, dto).subscribe();
	}

	delete(id: Group['id']) {
		delete this.groups[id];
		this.state.next(this.groups);
		this.groupService.delete(id).subscribe();
	}

	batchDelete(ids: Group['id'][]) {
		for (const id of ids) {
			delete this.groups[id];
		}
		this.state.next(this.groups);
		this.groupService.batchDelete(ids).subscribe();
	}
}
