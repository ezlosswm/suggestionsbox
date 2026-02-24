<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	let { data, children } = $props();
	const session = $derived(data.session);
</script>

<header class="sticky inset-x-0 top-0 z-10 border-b border-suggest-slate-200 bg-white p-6">
	<nav class="mx-auto flex w-full max-w-7xl items-center justify-end gap-3">
		<Button variant="link" href="/" class="mr-auto text-xl font-bold text-foreground"
			>SuggestBox</Button
		>

		{#if session}
			<Button variant="link" href="/profile" class="text-suggest-slate-600">Profile</Button>
		{:else}
			<Button href="/auth/login" class="bg-suggest-blue-700 hover:bg-suggest-blue-700/80"
				>Get Started</Button
			>
		{/if}
	</nav>
</header>

<main
	class="mx-auto flex min-h-[calc(100dvh-6rem)] items-center
 bg-suggest-neutral-50 p-3"
>
	{@render children()}
</main>
