<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Clock, Link } from 'lucide-svelte';
	import { convertTimeZone } from '$lib';
	import { onMount } from 'svelte';

	/**
	 * Dummy test data
	 */
	// const suggestionBoxes: SuggestionBox[] = [
	// 	{
	// 		id: '1',
	// 		box_title: 'Box Title',
	// 		created_at: '18/12/2025',
	// 		url: 'localhost:5173/pub/94819', // Generated link
	// 		suggestions: [
	// 			{
	// 				id: '1',
	// 				name: 'Suggestion Title 1',
	// 				description: 'This is the suggestion description.',
	// 				created_at: '12/18/2025'
	// 			},
	// 			{
	// 				id: '2',
	// 				name: 'Suggestion Title 2',
	// 				description: 'This is another suggestion description.',
	// 				created_at: '12/20/2025'
	// 			}
	// 		]
	// 	},
	// 	{
	// 		id: '2',
	// 		box_title: 'Another Box Title',
	// 		created_at: '19/12/2025',
	// 		url: 'localhost:5173/pub/0394819', // Generated link
	// 		suggestions: [
	// 			{
	// 				id: '1',
	// 				name: 'Suggestion Title 1',
	// 				description: 'This is the suggestion description.',
	// 				created_at: '12/18/2025'
	// 			},
	// 			{
	// 				id: '2',
	// 				name: 'Suggestion Title 2',
	// 				description: 'This is another suggestion description.',
	// 				created_at: '12/20/2025'
	// 			},

	// 			{
	// 				id: '3',
	// 				name: 'Suggestion Title 3',
	// 				description: 'This is another suggestion description.',
	// 				created_at: '12/20/2025'
	// 			}
	// 		]
	// 	}
	// ];

	let { data } = $props();
	const suggestionBoxes: SuggestionBox[] = $derived(data.suggestionBoxes ?? []);

	let host = $state('');

	onMount(() => {
		host = window.location.host;
	});
</script>

<Card.Root class="border-none shadow-none">
	<Card.Header class="flex flex-col">
		<div class="flex w-full items-center justify-between">
			<Card.Title>Suggestion Boxes</Card.Title>
			<Card.Action>
				<Button
					href="/profile/box/add"
					variant="link"
					class="cursor-pointer bg-green-600 text-white hover:bg-green-700"
					>New Suggestion Box</Button
				>
			</Card.Action>
		</div>
		<Card.Description>Manage your links here.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-3">
		{#each suggestionBoxes as box}
			{@render Box(box)}
		{/each}
	</Card.Content>
</Card.Root>

{#snippet Box(suggestionBox: SuggestionBox)}
	<Card.Root
		class=" hover:bg-gradient text-card-foreground hover:border-t-foreground/20 hover:bg-linear-0 hover:from-background/1 hover:from-92% hover:to-foreground/7 hover:shadow-md dark:bg-card-foreground/8"
		id={`suggestion-${suggestionBox.id}`}
	>
		<Card.Header>
			<Card.Title class="text-lg font-medium">
				{suggestionBox.box_title}
			</Card.Title>
		</Card.Header>
		<Card.Content class="flex justify-between">
			<div class="space-y-2 text-sm">
				<div class="flex items-center gap-2 text-muted-foreground">
					<span><Clock class="size-4" /></span>
					<p>
						{convertTimeZone(suggestionBox.created_at)}
					</p>
				</div>
				<div class="flex gap-2">
					<Link class="size-4" />
					<a href={suggestionBox.url} class="text-sm font-thin text-blue-400 hover:underline">
						{`${host + suggestionBox.url}`}
					</a>
				</div>
			</div>
			<Button
				href={suggestionBox.url}
				variant="default"
				class="cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
			>
				View
			</Button>
		</Card.Content>
	</Card.Root>
{/snippet}
