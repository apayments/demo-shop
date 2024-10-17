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

<h1>History of received postbacks</h1>
<table>
	<thead>
		<tr>
			<th>Payment ID</th>
			<th>Received At</th>
			<th>Status</th>
			<th>Amount</th>
			<th>Currency</th>
			<th>Environment</th>
			<th>/api/v1/payment-verify</th>
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
