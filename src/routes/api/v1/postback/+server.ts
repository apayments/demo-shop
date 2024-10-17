import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getKV } from '$lib/kv';

export const POST: RequestHandler = async ({ url, request, platform }) => {
	const payload = await request.json();
	if (!platform) return json({ error: 'Platform is required' });
	const kv = getKV(platform);
	payload.receivedAt = Math.floor(new Date().getTime() / 1000);
	payload.environment = url.searchParams.get('environment');
	console.log(payload);
	await kv.put(`${payload.paymentId}-${payload.receivedAt}`, payload, { expirationTtl: 600 });
	return new Response();
};
