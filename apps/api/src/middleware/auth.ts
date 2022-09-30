import { Request, Response, NextFunction } from 'express';

import { supabase, setSupabase } from '@lenotes-ng/data-storage';

export default async function auth(req: Request, res: Response, next: NextFunction) {

	const authHeader = req.headers.authorization;

	if (!authHeader) {
		console.error('not authenticated. missing Authorization header');
	}

	setSupabase(authHeader);
	next();
}