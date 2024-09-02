<script lang="ts">
	import '$lib/styles.scss';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	const { children }: { children: Snippet } = $props();
</script>

{@render children()}
