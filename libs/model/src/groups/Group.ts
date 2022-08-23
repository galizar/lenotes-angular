export class Group {
    id!: number;
    name!: string;
    isTrashed!: boolean;
}

class IdGroup {
	[id: number]: {
		name: string,
		isTrashed: boolean
	}
}