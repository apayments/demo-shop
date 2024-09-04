import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	console.log('postback', request.json());
	return new Response();
};
