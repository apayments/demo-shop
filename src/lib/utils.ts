import {
	DEV_TOKEN_PAYWAY1,
	DEV_TOKEN_PAYWAY2,
	DEV_TOKEN_PAYWAY3,
	DEV_TOKEN_PAYWAY4,
	DEV_TOKEN_PAYWAY5,
	DEV_TOKEN_PAYWAY6,
	DEV_TOKEN_PAYWAY7,
	DEV_TOKEN_PAYWAY8,
	PROD_TOKEN_PAYWAY1,
	PROD_TOKEN_PAYWAY2,
	PROD_TOKEN_PAYWAY3,
	PROD_TOKEN_PAYWAY4,
	PROD_TOKEN_PAYWAY5,
	PROD_TOKEN_PAYWAY6,
	PROD_TOKEN_PAYWAY7,
	PROD_TOKEN_PAYWAY8
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
	},
	payway3: {
		prod: PROD_TOKEN_PAYWAY3,
		test: DEV_TOKEN_PAYWAY3
	},
	payway4: {
		prod: DEV_TOKEN_PAYWAY4,
		test: PROD_TOKEN_PAYWAY4
	},
	payway5: {
		prod: PROD_TOKEN_PAYWAY5,
		test: DEV_TOKEN_PAYWAY5
	},
	payway6: {
		prod: PROD_TOKEN_PAYWAY6,
		test: DEV_TOKEN_PAYWAY6
	},
	payway7: {
		prod: PROD_TOKEN_PAYWAY7,
		test: DEV_TOKEN_PAYWAY7
	},
	payway8: {
		prod: PROD_TOKEN_PAYWAY8,
		test: DEV_TOKEN_PAYWAY8
	}
};
