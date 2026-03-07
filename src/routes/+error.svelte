<script lang="ts">
	import { page } from '$app/state';
	import { SunIcon } from 'lucide-svelte';
	import { MoonIcon } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toggleMode } from 'mode-watcher';

	let { data } = $props();
	const session = $derived(data.session);
</script>

<!-- Turn into component -->
<header class="sticky inset-x-0 top-0 z-10 p-6">
	<nav class="flex items-center justify-end gap-3">
		<Button aria-label="Home" variant="link" href="/" class="text-foreground">Home</Button>

		{#if session}
			<Button aria-label="Profile" variant="link" href="/profile" class="text-foreground"
				>Profile</Button
			>
		{:else}
			<Button aria-label="Login" variant="link" href="/auth/login" class="text-foreground"
				>Login</Button
			>
		{/if}

		<Button
			aria-label="Toggle theme"
			onclick={toggleMode}
			variant="outline"
			size="icon"
			class="cursor-pointer"
		>
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</nav>
</header>

<Alert.Root
	variant="destructive"
	class="mx-auto mb-4 w-full max-w-2xl border-0 text-center text-3xl"
>
	<Alert.Title>Error</Alert.Title>
	<Alert.Description class="mx-auto text-2xl font-normal">
		{page.error?.message}
	</Alert.Description>
</Alert.Root>
