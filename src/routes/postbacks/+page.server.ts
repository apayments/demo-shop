import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type LoadedItem = {
	status: string;
	amount: number;
	currency: string;
	paymentId: string;
	receivedAt: number;
	environment: string;
	payway: string;
};
type OutputType = {
	list: LoadedItem[];
};
export const load: PageServerLoad<OutputType> = async ({ fetch, setHeaders }) => {
	setHeaders({ 'Cache-Control': 'no-cache' });
	const res = await fetch(`/api/list`);
	const data: LoadedItem[] = await res.json();
	data.sort((a, b) => a.receivedAt - b.receivedAt);
	return { list: data };
};

export const actions: Actions = {
	verifyPayment: async ({ request, fetch }) => {
		const formData = await request.formData();
		const paymentId = formData.get('paymentId') as string;
		const environment = formData.get('environment') as string;
		const payway = formData.get('payway') as string;

		const res = await fetch(`/api/list/${paymentId}?environment=${environment}&payway=${payway}`);
		const data = await res.json();
		return data;
	}
};
