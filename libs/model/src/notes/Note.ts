export class Note {
	id!: number;
	props!: {
		name: string,
		groupId?: number,
		content: string,
		isTrashed: boolean
	} 
};