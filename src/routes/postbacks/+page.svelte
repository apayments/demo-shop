<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types.js';

	export let data;
	let modalData: any = null;
	let isModalOpen = false;
	let loading = false;

	const handleVerifyPayment = () => {
		loading = true;
		isModalOpen = true;
		//@ts-expect-error any
		return async ({ result }) => {
			try {
				modalData = result.data;
			} finally {
				loading = false;
			}
		};
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
				<th scope="col">Payway</th>
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
					<td>{item.payway}</td>
					<td>
						<form method="POST" action="?/verifyPayment" use:enhance={handleVerifyPayment}>
							<input type="hidden" name="paymentId" value={item.paymentId} />
							<input type="hidden" name="environment" value={item.environment} />
							<input type="hidden" name="payway" value={item.payway} />
							<button type="submit">request</button>
						</form>
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
						<strong>Payment "{modalData.paymentId}" details.</strong>
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
