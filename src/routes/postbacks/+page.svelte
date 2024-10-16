<script lang="ts">
	export let data;

	const { list } = data;
</script>

<h1>Postbacks Received</h1>
<table>
	<thead>
		<tr>
			<th>Name</th>
		</tr>
		<tr></tr>
	</thead>
	<tbody>
		{#each list as item}
			<tr>
				<td>{item.name}</td>
				<td><a href="/check?paymentId={item.name}">Details</a></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}
	td {
		border: 1px solid black;
		padding: 10px;
	}
	th {
		border: 1px solid black;
		padding: 10px;
	}
</style>
