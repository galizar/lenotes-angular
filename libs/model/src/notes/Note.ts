export class Note {
	id!: number
	name!: string
	content!: string
	groupId?: number
	isTrashed!: boolean
}

class IdNote {
	[id: number]: {
		name: string,
		content: string,
		groupId?: number,
		isTrashed: boolean
	}
}