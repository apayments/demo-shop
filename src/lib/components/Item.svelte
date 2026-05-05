<script lang="ts">
	export let id: string;
	export let price: number;
	export let title: string;
	export let currency: string;
	export let onAdd: (item: Item) => void;
	export let isCustom = false;

	let customPrice = price;
</script>

<div class="item">
	<h3>{title}</h3>
	{#if isCustom}
		<div class="custom-price">
			<span>{currency}</span>
			<input type="number" bind:value={customPrice} min="0.01" step="0.01" />
		</div>
		<button on:click={() => onAdd({ id, price: customPrice, title })}>Add to cart</button>
	{:else}
		<p>{currency}{price}</p>
		<button on:click={() => onAdd({ id, price, title })}>Add to cart</button>
	{/if}
</div>

<style>
	.custom-price {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.custom-price input {
		width: 80px;
		padding: 4px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
