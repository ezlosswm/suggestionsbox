<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	let { data, children } = $props();
	const session = $derived(data.session);
</script>

<Header {session} />
<main>
	{@render children()}
</main>
<Footer />
