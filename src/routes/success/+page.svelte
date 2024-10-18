<script>
	export let data;
</script>

<h1>SUCCESSFUL PAYMENT!</h1>
<h2>Payment ID: {data.paymentId}</h2>
<h4>
	The API sends payment postback notifications to the shop, containing payment details during the
	transaction process, which are then stored in the shop's store.
</h4>
<a href="/postbacks">See all postbacks</a>
