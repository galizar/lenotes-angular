import { Group, ObjectMap } from '../index';

export const testGroups: ObjectMap<Group> = { 
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
