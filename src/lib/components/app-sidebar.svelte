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
						url: '/profile'
					},
					{
						title: 'Manage Boxes',
						url: '/profile/box'
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
	<Sidebar.Header>
		<Button href="/profile" variant="link" class="text-2xl">Home</Button>
	</Sidebar.Header>
	<Sidebar.Content>
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
