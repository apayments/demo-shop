import { json, type RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SERVER_URL } from '$env/static/private';
import { tokenMapping } from '$lib/utils';

export const GET: RequestHandler = async ({ params, url }: RequestEvent) => {
	if (!params.id) return json({ error: 'id is required' });

	const environment = url.searchParams.get('environment') as 'prod' | 'test';
	const payway = url.searchParams.get('payway') as keyof typeof tokenMapping;
	if (!payway) return json({ error: 'payway is required' });
	if (!environment) return json({ error: 'environment=prod|test is required' });
	const token = tokenMapping[payway][environment];
	const response = await fetch(SERVER_URL + '/api/v1/payment-verify', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			paymentId: params.id
		})
	});
	const value = await response.json();
	return json(value);
};
