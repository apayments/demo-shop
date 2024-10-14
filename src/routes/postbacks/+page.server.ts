import type { PageServerLoad } from './$types';

type Item = {
	name: string;
};
type OutputType = {
	list: Item[];
};
export const load: PageServerLoad<OutputType> = async ({ fetch }) => {
	const res = await fetch(`/api/list`);

	const { keys } = await res.json();

	return { list: keys };
};
