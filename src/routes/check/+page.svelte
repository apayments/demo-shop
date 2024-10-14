<script lang="ts">
	export let data;

	const { status, amount, currency, paymentId } = data;
</script>

<p>Status: {status}</p>
<p>Amount: {amount} {currency}</p>
<p>Payment ID: {paymentId}</p>
<a href="/postbacks">See all postbacks</a>
