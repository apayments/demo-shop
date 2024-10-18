import { json, type RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getKV } from '$lib/kv';

type KvKey = {
	name: string;
};

export const GET: RequestHandler = async ({ platform }: RequestEvent) => {
	if (!platform) return json({ error: 'Platform is required' });

	const kv = getKV(platform);
	let keys: string[] = [];
	let cursor = null;

	do {
		const response = await kv.list({ cursor });
		keys = keys.concat(response.keys.map((item: KvKey) => item.name));
		cursor = response.cursor;
	} while (cursor);

	const values = await Promise.all(
		keys.map(async (key) => {
			const value = await kv.get(key);
			return value;
		})
	);

	return json(values);
};
