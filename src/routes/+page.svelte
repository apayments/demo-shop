<script lang="ts">
	import ItemComponent from '$lib/components/Item.svelte';
	import items from './items.json';
	let cart = $state([] as (Item & Amount)[]);
</script>

<header>
	Example shop
	<div class="list">
		<ol>
			{#each cart as { id, title, amount }, i}
				<li>{title}</li>
			{/each}
		</ol>
		<p>{cart.reduce((acc, { price, amount }) => acc + price * amount, 0)} USD</p>
		<form action="?/checkout" method="post">
			<input type="hidden" name="cart" value={JSON.stringify(cart)} />
			<button>BUY</button>
		</form>
	</div>
</header>

<main>
	{#each items as item}
		<ItemComponent {...item} onAdd={(item) => (cart = [...cart, { ...item, amount: 1 }])} />
	{/each}
</main>
