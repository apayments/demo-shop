import { json, type RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getKV } from '$lib/kv';

export const GET: RequestHandler = async ({ platform, params }: RequestEvent) => {
	if (!platform) return json({ error: 'Platform is required' });

	const kv = getKV(platform);
	return json(await kv.get(params.id));
};
