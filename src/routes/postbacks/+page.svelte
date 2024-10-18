<script lang="ts">
	export let data;

	let modalData: any = null;
	let isModalOpen = false;
	let loading = false;
	const verifyPayment = async ({
		paymentId,
		environment
	}: {
		paymentId: string;
		environment: string;
	}) => {
		try {
			loading = true;
			isModalOpen = true;
			const res = await fetch(`/api/list/${paymentId}?environment=${environment}`);
			const data = await res.json();

			modalData = data;
		} catch {
			modalData = { error: 'Something went wrong' };
		} finally {
			loading = false;
		}
	};
</script>

<header class="header">
	<h1>History of Received Postbacks</h1>
	<h1><a href="/">Main Page</a></h1>
	<h1>
		<a target="_blank" href="https://api.apay.pp.ua/docs/api#postback-to-shop">Postbacks Docs</a>
	</h1>
</header>
<div class="overflow-auto">
	<table>
		<thead>
			<tr>
				<th scope="col">Payment ID</th>
				<th scope="col">Received At</th>
				<th scope="col">Status</th>
				<th scope="col">Amount</th>
				<th scope="col">Currency</th>
				<th scope="col">Environment</th>
				<th scope="col">/api/v1/payment-verify</th>
			</tr>
		</thead>
		<tbody>
			{#each data.list as item}
				<tr>
					<td>{item.paymentId}</td>
					<td>{item.receivedAt}</td>
					<td>{item.status}</td>
					<td>{item.amount}</td>
					<td>{item.currency}</td>
					<td>{item.environment}</td>
					<td>
						<button
							on:click={() =>
								verifyPayment({ paymentId: item.paymentId, environment: item.environment })}
						>
							request
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
{#if isModalOpen}
	<dialog open={isModalOpen} on:click={() => (isModalOpen = false)}>
		<article
			on:click={(e) => {
				e.stopPropagation();
			}}
		>
			{#if loading}
				<progress />
			{:else}
				<header>
					<p>
						<strong>Payment "{modalData._id}" details.</strong>
					</p>
					<button aria-label="Close" rel="prev" on:click={() => (isModalOpen = false)}></button>
				</header>
				{#each Object.entries(modalData) as [key, value]}
					<p>
						<strong>{key}:</strong>
						<span>{JSON.stringify(value, null, 2)}</span>
					</p>
				{/each}
			{/if}
		</article>
	</dialog>
{/if}

<style>
	table {
		border-collapse: collapse;
	}
	td {
		border: 1px solid #eee;
		padding: 10px;
	}
	th {
		border: 1px solid #eee;
		padding: 10px;
	}
</style>
