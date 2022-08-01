<script lang="ts">
	import { getContext } from 'svelte';

	const { getStripe } = getContext('stripe');
	const stripe = getStripe();

	const rand = Math.round(Math.random()*1000000000000000) + "a";

	async function buy(priceIdA, shirtIdA) {
		if (priceIdA) {
			const res = await fetch('/stripe/checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ priceId: priceIdA, shirtId: shirtIdA })
			});
			const { sessionId } = await res.json();
			stripe.redirectToCheckout({
				sessionId
			});
		} 
	}
</script>

<section class="plans">
	<div class="plan">
		<div class="top">
			<div class="about">
				<h2 class="title">
					KULT 25 Custom t-shirt
				</h2>
				<div class="description">
					Blah blah blah {rand}
				</div>
			</div>
			<div class="price">
				<span class="dollars">500 Kč</span>
			</div>
			<button on:click={() => buy("price_1LP8ROIk9B5Wm2FF5tjBwFvp", rand)}>Choose</button>
		</div>
		<div class="divider" />
	</div>
</section>

<style>

</style>
