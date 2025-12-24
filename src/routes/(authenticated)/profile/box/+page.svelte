<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Clock, Link } from 'lucide-svelte';
	import { convertTimeZone } from '$lib';
	import { onMount } from 'svelte';

	let { data } = $props();
	const suggestionBoxes: SuggestionBox[] = $derived(data.suggestionBoxes ?? []);

	let host = $state('');

	onMount(() => {
		host = window.location.host;
	});
</script>

<section class="mx-auto w-full max-w-4xl border-none shadow-none">
	<div class="mb-6 flex flex-col">
		<div class="flex w-full items-center justify-between border">
			<h1 class="text-lg font-medium">Suggestion Boxes</h1>
			<Button
				href="/profile/box/add"
				class="cursor-pointer bg-green-500 text-white hover:bg-green-600">New Suggestion Box</Button
			>
		</div>
		<p class="text-sm text-muted-foreground">Manage your links here.</p>
	</div>
	<div class="grid gap-2 pt-4 md:grid-cols-2">
		{#each suggestionBoxes as box}
			{@render Box(box)}
		{/each}
	</div>
</section>

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
