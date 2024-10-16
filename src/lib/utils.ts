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
