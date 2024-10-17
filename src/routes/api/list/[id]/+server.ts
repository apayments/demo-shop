import { json, type RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PROD_TOKEN, SERVER_TOKEN, SERVER_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params, url }: RequestEvent) => {
	if (!params.id) return json({ error: 'id is required' });
	const isProd = url.searchParams.get('environment') === 'prod';
	const response = await fetch(SERVER_URL + '/api/v1/payment-verify', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${isProd ? PROD_TOKEN : SERVER_TOKEN}`
		},
		body: JSON.stringify({
			paymentId: params.id
		})
	});
	const value = await response.json();
	return json(value);
};
