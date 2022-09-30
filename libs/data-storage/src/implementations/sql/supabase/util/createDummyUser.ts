import { supabase } from '../db';

(async () => {
	const {data, error} = 
		await supabase.auth.signUp({
			email: process.env.DUMMY_EMAIL!, 
			password: process.env.DUMMY_PASSWORD!
		});

	if (error) {
		console.error(error);
	}
})();