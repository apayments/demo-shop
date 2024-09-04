import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SERVER_URL, SERVER_TOKEN } from '$env/static/private';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	checkout: async ({ request }) => {
		const body = await request.formData();
		const cart = Array.from(JSON.parse(body.get('cart')?.toString() || '[]')) as unknown as Item[];
		const currency = body.get('currency');

		const host = request.headers.get('host');
		const protocol = request.headers.get('x-forwarded-proto') || 'http';
		const sum = cart.reduce((acc, item) => acc + item.price, 0);
		const response = await fetch(SERVER_URL + '/api/v1/init-payment', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${SERVER_TOKEN}`
			},
			body: JSON.stringify({
				amount: sum,
				currency,
				successCallback: protocol + '://' + host + '/success',
				failureCallback: protocol + '://' + host + '/failure',
				postbackUrl: protocol + '://' + host + '/api/v1/postback'
			})
		});

		if (response.ok) {
			return redirect(301, (await response.json()).paymentLink);
		}

		return error(500, await response.text());
	}
};
