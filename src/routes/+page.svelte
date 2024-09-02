<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import ItemComponent from '$lib/components/Item.svelte';
	import items from './items.json';

	let cart = writable([] as (Item & Amount)[]);
	let selectedCurrency = writable('USD');

	const currencies = {
		USD: { symbol: '$', rate: 1 },
		EUR: { symbol: '€', rate: 0.85 },
		GBP: { symbol: '£', rate: 0.73 }
	} as const;
	type Currency = keyof typeof currencies;

	function convertPrice(price: number, currency: string) {
		return Number((price * currencies[currency as Currency].rate).toFixed(2));
	}

	$: totalPrice = $cart.reduce((acc, { price, amount }) => acc + price * amount, 0);

	function addToCart(item: Item) {
		cart.update((items) => [...items, { ...item, amount: 1 }]);
	}
</script>

<header>
	<h1>Example Shop</h1>
	<div class="cart">
		<h2>Cart</h2>
		{#if $cart.length > 0}
			<ol>
				{#each $cart as { title, amount, price }}
					<li>
						{title} x {amount} - {currencies[$selectedCurrency as Currency].symbol}{convertPrice(
							price * amount,
							$selectedCurrency
						)}
					</li>
				{/each}
			</ol>
			<p class="total">
				Total: {currencies[$selectedCurrency as Currency].symbol}{convertPrice(
					totalPrice,
					$selectedCurrency
				)}
			</p>
			<form action="?/checkout" method="post">
				<input type="hidden" name="currency" value={$selectedCurrency} />
				<input type="hidden" name="cart" value={JSON.stringify($cart)} />
				<button class="buy-button">Checkout</button>
			</form>
		{:else}
			<p>Your cart is empty</p>
		{/if}
	</div>
	<div class="currency-selector">
		<label for="currency">Currency:</label>
		<select id="currency" bind:value={$selectedCurrency}>
			{#each Object.keys(currencies) as currency}
				<option value={currency}>{currency}</option>
			{/each}
		</select>
	</div>
</header>

<main>
	<div class="item-grid">
		{#each items as item}
			<ItemComponent
				{...item}
				price={convertPrice(item.price, $selectedCurrency)}
				currency={currencies[$selectedCurrency as Currency].symbol}
				onAdd={addToCart}
			/>
		{/each}
	</div>
</main>
