<script lang="ts">
	const { id, price, title, onAdd }: Item & { onAdd: (item: Item) => void } = $props();
</script>

<div class="item">
	<h3>{title}</h3>
	<p>{price}</p>
	<button onclick={() => onAdd({ id, price, title })}>Add to cart</button>
</div>

<style lang="scss">
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		margin: 0.5rem;
	}

	button {
		margin-top: 1rem;
	}
</style>
