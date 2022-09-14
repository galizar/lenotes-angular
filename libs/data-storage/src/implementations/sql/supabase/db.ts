import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

// remote
const supabaseUrl = process.env.SUPABASE_URL; 
const supabaseKey = process.env.SUPABASE_KEY;

// local, too limited. Can't do auth easily
//const supabaseUrl = process.env.SUPABASE_LOCAL_URL; 
//const supabaseKey = process.env.SUPABASE_LOCAL_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);
