<script lang="ts">
	export let id: string;
	export let price: number;
	export let title: string;
	export let currency: string;
	export let onAdd: (item: Item) => void;
</script>

<div class="item">
	<h3>{title}</h3>
	<p>{currency}{price}</p>
	<button on:click={() => onAdd({ id, price, title })}>Add to cart</button>
</div>
