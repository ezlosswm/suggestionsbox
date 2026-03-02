<script lang="ts">
	import { page } from '$app/state'; // SvelteKit's Svelte 5 reactive page state
	import { LogOut, User, Package } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const data = {
		navMain: [
			{
				title: 'Profile',
				items: [
					{
						title: 'Manage Boxes',
						url: '/profile/box',
						icon: Package
					},
					{
						title: 'Account Settings',
						url: '/profile',
						icon: User
					}
				]
			}
		]
	};
</script>

<Sidebar.Root {...restProps} bind:ref>
	<Sidebar.Header class="bg-suggest-white">
		<Button href="/profile" variant="link" class="text-2xl hover:no-underline">
			<svg
				class="size-6 fill-suggest-blue-700"
				fill="currentColor"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"></path>
			</svg>
			<h1 class="text-xl font-black -tracking-wider">SuggestBox</h1>
		</Button>
	</Sidebar.Header>
	<Sidebar.Content class="bg-suggest-white">
		{#each data.navMain as group (group.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu class="space-y-2">
						{#each group.items as item (item.title)}
							{@const isActive = page.url.pathname === item.url}

							<Sidebar.MenuItem>
								<Sidebar.MenuButton
									{isActive}
									class="text-sm hover:bg-suggest-blue-700/20 hover:text-suggest-blue-700 data-[active=true]:bg-suggest-blue-700/10 data-[active=true]:text-suggest-blue-700"
								>
									{#snippet child({ props })}
										<a href={item.url} {...props}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
	<Sidebar.Footer>
		<Button href="/auth/logout" variant="destructive" class="cursor-pointer">
			<LogOut />
			<p>Logout</p>
		</Button>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
