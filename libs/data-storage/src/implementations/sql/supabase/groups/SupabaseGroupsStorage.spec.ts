import { supabase } from '../db';
import { SupabaseGroupsStorage } from './SupabaseGroupsStorage';
import { Group } from '@lenotes-ng/model';

describe('SupabaseGroupsStorage', () => {

	let storage = new SupabaseGroupsStorage();

	beforeAll(async () => {

		await supabase.auth.signIn({
			email: process.env.DUMMY_EMAIL, 
			password: process.env.DUMMY_PASSWORD
		});
	});

	beforeEach(() => {

		// the db is exactly the same and persists changes across tests. i.e. tests
		// are not isolated as of now
	});

	//it('gets a group', async () => {
	//	throw Error('no impl');
	//});

	//it('updates group', async () => {

	//	const newProps = {name: 'supa update', isTrashed: false};

	//	await storage.update({id: 0, props: newProps});
	//	const props = await storage.get(0);

	//	expect(props).toEqual(newProps);
	//});

	it('throws trying to get non-existent group', async () => {

		let actualError;

		try {
			await storage.get(-1);
		} catch (e) {
			console.error(e);
			actualError = e;
		};

		expect(actualError).toBeDefined();
	});

	it('deletes group', async () => {

		await storage.delete(0);

		let actualError;

		try {
			await storage.get(0);
		} catch (e) {
			console.error(e);
			actualError = e;
		}

		expect(actualError).toBeDefined();
	});

	//it('creates a group', async () => {

	//	const data = await supabase.auth.signIn({
	//		email: process.env.DUMMY_EMAIL, 
	//		password: process.env.DUMMY_PASSWORD
	//	});

	//	const id = await storage.create({name: 'supa group', isTrashed: false});

	//	expect(id).toEqual(3);

	//	await storage.delete(id);
	//});
});