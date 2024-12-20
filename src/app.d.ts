import type { KVNamespace } from '@cloudflare/workers-types';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				KV_CACHE: KVNamespace;
			};
		}
	}
	type Item = {
		id: string;
		title: string;
		price: number;
	};

	type Amount = {
		amount: number;
	};
}

export {};
