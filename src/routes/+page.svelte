<script lang="ts">
	import { writable, derived } from 'svelte/store';
	import ItemComponent from '$lib/components/Item.svelte';
	import items from './items.json';

	let cart = writable([] as (Item & Amount)[]);
	let selectedCurrency = writable('USD');

	let isProd = writable(true);
	let payway = writable('payway1');
	let email = '';
	const currencies = {
		USD: { symbol: '$', rate: 1 },
		EUR: { symbol: '€', rate: 0.85 }
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

<header class="header">
	<h1>Example Shop</h1>
	<h1>
		<a href="/postbacks">Postbacks History</a>
	</h1>
	<h1>
		<a target="_blank" href="https://api.apay.pp.ua/docs/api">Api Docs</a>
	</h1>
	<div class="row">
		<div class="selector-wrap">
			<label for="currency">Currency:</label>
			<select id="currency" bind:value={$selectedCurrency}>
				{#each Object.keys(currencies) as currency}
					<option value={currency}>{currency}</option>
				{/each}
			</select>
		</div>
		<div class="selector-wrap">
			<label for="isProd">Env:</label>
			<select id="isProd" bind:value={$isProd}>
				<option value={false}>Test</option>
				<option value={true}>Prod</option>
			</select>
		</div>
		<div class="selector-wrap">
			<label for="payway">Token:</label>
			<select id="payway" bind:value={$payway}>
				<option value={'payway1'}>payway1</option>
				<option value={'payway2'}>payway2</option>
				<option value={'payway3'}>payway3</option>
			</select>
		</div>
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
	<div class="cart">
		<h2>Cart</h2>
		{#if $cart.length > 0}
			<ol>
				{#each $cart as { title, amount, price }}
					<li>
						{title} x {amount} - {currencies[$selectedCurrency as Currency].symbol}{price}
					</li>
				{/each}
			</ol>
			<p class="total">
				Total: {currencies[$selectedCurrency as Currency].symbol}{totalPrice}
			</p>
			<form action="?/checkout" method="post">
				<input type="email" bind:value={email} name="email" placeholder="Email" />
				<!-- <input type="hidden" name="email" value={email} /> -->
				<input type="hidden" name="currency" value={$selectedCurrency} />
				<input type="hidden" name="cart" value={JSON.stringify($cart)} />
				<input type="hidden" name="isProd" value={$isProd} />
				<input type="hidden" name="payway" value={$payway} />
				<button disabled={email.length < 1} class="buy-button">Checkout</button>
			</form>
		{:else}
			<p>Your cart is empty</p>
		{/if}
	</div>
</main>
