export class Note {
	id!: {
		name: string,
		content: string,
		groupId?: number,
		isTrashed: boolean
	}
}