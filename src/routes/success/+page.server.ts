import { error } from '@sveltejs/kit';

export const load = async ({ url }) => {
	const paymentId = url.searchParams.get('paymentId');
	if (!paymentId) {
		error(400, 'paymentId is not provided');
	}
	return { paymentId };
};
