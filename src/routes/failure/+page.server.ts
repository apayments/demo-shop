// import { error } from '@sveltejs/kit';
// import type { PageServerLoad } from './$types';
// import { sleep } from '$lib/utils';

// type OutputType = {
// 	status: string;
// 	amount: number;
// 	currency: string;
// 	paymentId: string;
// };
// export const load: PageServerLoad<OutputType> = async ({ fetch, url }) => {
// 	const paymentId = url.searchParams.get('paymentId');
// 	if (!paymentId) {
// 		error(400, 'paymentId is required');
// 	}

// 	const pollData = async (attempt = 1, maxAttempts = 5, delay = 1000): Promise<OutputType> => {
// 		const res = await fetch(`/api/list/${paymentId}`);

// 		const data = await res.json();
// 		if (data !== null) {
// 			return data;
// 		}

// 		if (attempt >= maxAttempts) {
// 			error(404, 'Payment not found');
// 		}
// 		await sleep(delay);
// 		return pollData(attempt + 1);
// 	};

// 	const data = await pollData();
// 	return data;
// };
