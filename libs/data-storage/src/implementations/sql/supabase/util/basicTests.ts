import { supabase } from '../db';

// sign in
(async () => { 
	const {data, error} = await supabase.auth.signInWithPassword({
		email: process.env.DUMMY_EMAIL!, 
		password: process.env.DUMMY_PASSWORD!
	});

	setImmediate(() => {
		console.log('user on signin', data.user);
		console.log('signin session', data.session);
	});

	const {data: userData, error: userError} = await supabase.auth.getUser();

	setImmediate(() => {
		console.log('user from auth.getUser', userData.user);
	});
})();
