import { json, type RequestHandler } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { tokenMapping } from '$lib/utils';
import { SERVER_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const environment = url.searchParams.get('environment') as 'prod' | 'test';
	const payway = url.searchParams.get('payway') as keyof typeof tokenMapping;

	console.log('payway', payway);

	if (!payway || payway !== 'payway6') {
		return json({ error: 'payway=payway6 is required' }, { status: 400 });
	}

	if (!environment) {
		return json({ error: 'environment=prod|test is required' }, { status: 400 });
	}

	const token = tokenMapping[payway][environment];

	const response = await fetch(SERVER_URL + '/api/v1/konnektive/products', {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error('Response error:', errorText);
		return json({ error: 'Failed to fetch products', details: errorText }, { status: response.status });
	}

	const products = await response.json();
	console.log('Products received:', products);
	return json(products);
};

