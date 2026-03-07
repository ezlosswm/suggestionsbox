<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Session } from '@supabase/supabase-js';

	let { session }: { session: Session | null } = $props();
</script>

<header class="sticky inset-x-0 top-0 z-80 border-b border-suggest-slate-200 bg-white p-6">
	<nav class="mx-auto flex w-full max-w-7xl items-center justify-end gap-3">
		<Button
			aria-label="SuggestBox Home"
			variant="link"
			href="/"
			class="mr-auto text-xl font-bold -tracking-wider text-foreground"
		>
			<svg
				class="size-6 fill-suggest-blue-700"
				fill="currentColor"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"></path>
			</svg>
			SuggestBox</Button
		>

		{#if session}
			<Button aria-label="Profile" variant="link" href="/profile" class="text-suggest-slate-600"
				>Profile</Button
			>
		{:else}
			<Button
				aria-label="Get Started"
				href="/auth/login"
				class="bg-suggest-blue-700 hover:bg-suggest-blue-700/80">Get Started</Button
			>
		{/if}
	</nav>
</header>
