export function safeJSON(val: string, fallback: unknown): unknown {
	try {
		return JSON.parse(val);
	} catch (e) {
		console.error(e);
		return fallback;
	}
}
