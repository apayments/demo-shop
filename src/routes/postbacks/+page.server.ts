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
