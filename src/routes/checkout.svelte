<script>
    import Pricing from '$lib/Pricing/index.svelte';
    import StripeProvider from '$lib/stripe/StripeProvider.svelte';
    import Generator from "../lib/Generator/index.svelte";
    import { goto } from '$app/navigation';

    let url;

    function getUrl() {
        url = "/generate" + window.location.search;
        window.location.href = url;
    }

    
</script>

<svelte:head>
	<title>Kult 25 T-shirt generator</title>
</svelte:head>

<Generator mode="preview" />

<button on:click={getUrl}>Back to generating</button>

<StripeProvider>
	<section>
		<Pricing />
	</section>
</StripeProvider>
