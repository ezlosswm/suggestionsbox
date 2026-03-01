<script lang="ts" module>
	import { LogOut } from 'lucide-svelte';
	const data = {
		navMain: [
			{
				title: 'Profile',
				url: '/profile',
				items: [
					{
						title: 'Account Settings',
						url: '/profile',
						isActive: false
					},
					{
						title: 'Manage Boxes',
						url: '/profile/box',
						isActive: false
					}
				]
			}
		]
	};
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {...restProps} bind:ref>
	<Sidebar.Header class="bg-suggest-white">
		<Button href="/profile" variant="link" class="text-2xl no-underline">
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
		<!-- We create a Sidebar.Group for each parent. -->
		{#each data.navMain as group (group.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={item.isActive}>
									{#snippet child({ props })}
										<a href={item.url} {...props}>{item.title}</a>
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
			<span><LogOut /></span>
			<p>Logout</p>
		</Button>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
