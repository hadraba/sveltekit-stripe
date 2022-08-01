<script>
    import Generator from "../lib/Generator/index.svelte";
    import { onMount, afterUpdate } from "svelte/internal";
    import { goto, invalidate } from '$app/navigation';

    let url;

    function getUrl() {
        url = "/checkout" + window.location.search;
        window.location.href = url;
    }
</script>

<svelte:head>
	<title>Kult 25 T-shirt generator</title>
</svelte:head>

<Generator mode="generate" />
<br>
<button on:click={getUrl}>Preview and checkout</button>