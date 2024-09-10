import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getKV } from '$lib/kv';

export const POST: RequestHandler = async ({ request, platform }) => {
	const payload = await request.json();
	console.log('postback', payload);
	if (!platform) return json({ error: 'Platform is required' });
	const kv = getKV(platform);
	await kv.put(payload.paymentId, payload, { expirationTtl: 600 });
	return new Response();
};
