<script lang="ts">
	import { SunIcon } from 'lucide-svelte';
	import { MoonIcon } from 'lucide-svelte';

	import { Button } from '$lib/components/ui/button/index.js';
	import { toggleMode } from 'mode-watcher';

	let { children } = $props();
</script>

<header class="sticky inset-x-0 top-0 z-10 border border-border p-6">
	<nav class="flex items-center justify-end gap-3">
		<Button variant="link" href="/" class="text-foreground">Home</Button>
		<Button variant="link" href="/auth/login" class="text-foreground">Login</Button>

		<Button onclick={toggleMode} variant="outline" size="icon" class="cursor-pointer">
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

{@render children()}
