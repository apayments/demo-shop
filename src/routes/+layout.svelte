<script lang="ts">
	import '@picocss/pico';
	import '$lib/styles.scss';
	import type { Snippet } from 'svelte';
	import img from '$lib/assets/github-mark-white.svg';
	const { children }: { children: Snippet } = $props();
</script>

<div id="page-container">
	<div id="content-wrap">
		{@render children()}
	</div>
	<footer id="footer">
		<a target="_blank" href="https://github.com">
			<b class="github">GitHub</b>
			<img src={img} alt="github logo" class="github" />
		</a>
	</footer>
</div>
