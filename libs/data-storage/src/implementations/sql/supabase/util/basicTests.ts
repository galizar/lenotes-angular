import { supabase } from '../db';

const supaClient = supabase(process.env.SUPABASE_URL!, process.env.SUPABASE_URL!);

// sign in
(async () => { 
	const data = await supaClient.auth.signIn({
		email: process.env.DUMMY_EMAIL, 
		password: process.env.DUMMY_PASSWORD
	});

	setImmediate(() => {
		console.log('user on signin', data.user);
		console.log('signin session', data.session);
	});

	const user = await supaClient.auth.api.getUser(data.session?.access_token!);

	setImmediate(() => {
		console.log('user from api.getUser', user);
	});
})();
