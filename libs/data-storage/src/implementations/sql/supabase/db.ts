import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL; 
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);

(async () => {
	const {user, session, error} = 
		await supabase.auth.signUp({email: 'lecrunchic@gmail.com', password: '123456'});

	if (error) {
		console.error(error);
	}


})();