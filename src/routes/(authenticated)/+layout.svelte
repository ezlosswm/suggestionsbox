<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';

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
			</div>
		</div>

		<div class=" p-6">
			{@render children?.()}
		</div>
	</main>
</Sidebar.Provider>
