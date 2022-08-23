import { Group } from "./Group";

export const testGroups: Record<number, Group['id']> = { 
	0: {
		name: 'group A',
		isTrashed: false
	},
	1: {
		name: 'group B',
		isTrashed: false
	},
	2: {
		name: 'group C',
		isTrashed: true
	}
};
