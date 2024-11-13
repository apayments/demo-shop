import {
	DEV_TOKEN_PAYWAY1,
	DEV_TOKEN_PAYWAY2,
	PROD_TOKEN_PAYWAY1,
	PROD_TOKEN_PAYWAY2
} from '$env/static/private';

export function safeJSON(val: string, fallback: unknown): unknown {
	try {
		return JSON.parse(val);
	} catch (e) {
		console.error(e);
		return fallback;
	}
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const tokenMapping = {
	payway1: {
		prod: PROD_TOKEN_PAYWAY1,
		test: DEV_TOKEN_PAYWAY1
	},
	payway2: {
		prod: PROD_TOKEN_PAYWAY2,
		test: DEV_TOKEN_PAYWAY2
	}
};
