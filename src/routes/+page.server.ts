import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SERVER_URL, SERVER_TOKEN, PROD_TOKEN } from '$env/static/private';
import { safeJSON } from '../lib/utils';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	checkout: async ({ request, url }) => {
		const body = await request.formData();
		const cart = safeJSON(body.get('cart')!.toString(), []) as Item[];
		const currency = body.get('currency');
		const customerEmail = body.get('email');
		const isProd = body.get('isProd');
		const sum = cart.reduce((acc, item) => acc + item.price, 0);
		const response = await fetch(SERVER_URL + '/api/v1/init-payment', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${isProd === 'true' ? PROD_TOKEN : SERVER_TOKEN}`
			},
			body: JSON.stringify({
				customerEmail,
				amount: sum,
				currency,
				successCallback: url.origin + '/success',
				failureCallback: url.origin + '/failure',
				postbackUrl: url.origin + '/api/v1/postback'
			})
		});

		if (response.ok) {
			return redirect(301, (await response.json()).paymentLink);
		}

		return error(500, await response.text());
	}
};
