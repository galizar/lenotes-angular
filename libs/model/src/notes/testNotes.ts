import { Note, ObjectMap } from "../index";

export const testNotes: ObjectMap<Note> = { 
	0: {name: 'note 1', content: 'content 1', groupId: 0, isTrashed: false},
	1: {name: 'note 2', content: 'content 2', groupId: 1, isTrashed: false},
	2: {name: 'note 3', content: 'content 3', groupId: 2, isTrashed: true},
	3: {name: 'note 4', content: 'content 4', groupId: 1, isTrashed: true},
	4: {name: 'note 5', content: 'content 5', groupId: 0, isTrashed: true},
	5: {name: 'note 6', content: 'content 6', groupId: 1, isTrashed: false},
	6: {name: 'note 7', content: 'content 7', groupId: 1, isTrashed: true},
  7: {name: 'note 8', content: 'content 8', groupId: 2, isTrashed: true},
	8: {name: 'note 9', content: 'content 9', groupId: 2, isTrashed: true},
	9: {name: 'note 10', content: 'content 10', groupId: 0, isTrashed: false},
};