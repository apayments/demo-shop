import {
	type KVNamespace,
	type KVNamespaceGetOptions,
	type KVNamespaceListOptions,
	type KVNamespacePutOptions
} from '@cloudflare/workers-types';

class kvCache {
	constructor(kv: KVNamespace) {
		this.kv = kv;
	}

	async get(key: string, options?: Partial<KVNamespaceGetOptions<undefined>>) {
		const data = await this.kv.get(key, options);
		return data ? JSON.parse(data) : data;
	}
	async put(key: string, value: unknown, options?: KVNamespacePutOptions) {
		return await this.kv.put(key, JSON.stringify(value), options);
	}

	async list(options?: Partial<KVNamespaceListOptions>) {
		return await this.kv.list(options);
	}

	async delete(key: string) {
		return await this.kv.delete(key);
	}

	async deleteAll() {
		const list = await this.kv.list();
		return Promise.all(list.keys.map((key) => this.kv.delete(key.name)));
	}
}

export function getKV(platform: App.Platform) {
	if (platform.env.KV_CACHE) return new kvCache(platform.env.KV_CACHE);
	throw 'no kv present';
}
