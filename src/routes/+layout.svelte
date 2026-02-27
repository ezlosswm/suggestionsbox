<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { navigating } from '$app/state';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	let { children } = $props();
</script>

<svelte:head>
	<title>SuggestBox</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if navigating.to}
	<!-- Small loading top corner -->
	<div
		class="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-linear-to-r from-purple-500 from-15% to-blue-500"
		in:fly={{ x: '-100%', delay: 0, duration: 3000, easing: expoOut }}
		out:fly={{ duration: 200, x: 0 }}
	></div>
{/if}

<Toaster position="top-right" duration={4000} />
<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
