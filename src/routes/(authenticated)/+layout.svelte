<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { SunIcon } from 'lucide-svelte';
	import { MoonIcon } from 'lucide-svelte';

	import { Button } from '$lib/components/ui/button/index.js';
	import { toggleMode } from 'mode-watcher';

	let { data, children } = $props();

	const user = $derived(data.session.user.user_metadata.full_name);
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full">
		<div class="flex items-center justify-between p-3">
			<Sidebar.Trigger />

			<div class="flex items-center space-x-3">
				<h2>Hey, {user}</h2>

				<Button onclick={toggleMode} variant="ghost" size="icon" class="mr-3  cursor-pointer">
					<SunIcon
						class="size-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
					/>
					<MoonIcon
						class="absolute size-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>
		</div>

		<div class=" p-6">
			{@render children?.()}
		</div>
	</main>
</Sidebar.Provider>
