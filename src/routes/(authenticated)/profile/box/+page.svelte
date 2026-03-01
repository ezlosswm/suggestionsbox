<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Calendar, CirclePlus, Copy, Plus } from 'lucide-svelte';
	import { convertTimeZone } from '$lib';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { copyLink } from '$lib';

	import { toast } from 'svelte-sonner';

	let { data } = $props();
	const suggestionBoxes: SuggestionBox[] = $derived(data.suggestionBoxes ?? []);

	let host = $state('');

	onMount(() => {
		host = window.location.host;
	});
</script>

<svelte:head>
	<title>Manage Boxes | SuggestBox</title>
	<meta name="description" content="Manage your active feedback collection channels." />
</svelte:head>

<section class="mx-auto w-full max-w-4xl border-none shadow-none">
	<div class="mb-6 flex flex-col items-center gap-2 md:flex-row md:justify-between">
		<div class="flex flex-col">
			<h1 class="text-2xl leading-9 font-black -tracking-wide sm:text-3xl">Suggestion Boxes</h1>
			<p class="text-suggest-slate-600">Manage your active feedback collection channels.</p>
		</div>
		<Button
			href="/profile/box/add"
			class="w-full cursor-pointer bg-suggest-blue-700 font-bold text-suggest-white hover:bg-suggest-blue-700/80 sm:w-fit"
		>
			<CirclePlus class="size-5" />
			New Suggestion Box
		</Button>
	</div>
	<div class="flex flex-wrap items-center justify-center gap-2 pt-4">
		{#each suggestionBoxes as box}
			{@render Box(box)}
		{/each}
		<div
			class="group flex min-h-72 w-72 max-w-md cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-suggest-slate-200 bg-suggest-white transition-colors hover:border-suggest-blue-700"
		>
			<div class="p-6 text-center">
				<div
					class="mx-auto mb-6 w-fit rounded-full bg-suggest-slate-200/60 p-4 transition-colors group-hover:bg-suggest-blue-700"
				>
					<Plus class="size-8 text-suggest-slate-500 group-hover:text-suggest-white" />
				</div>
				<h4 class="font-bold">Create New Box</h4>
				<p class="mt-1 max-w-[150px] text-xs text-suggest-slate-500">
					Start collectiong suggestion in secconds.
				</p>
			</div>
		</div>
	</div>
</section>

{#snippet Box(suggestionBox: SuggestionBox)}
	<Card.Root
		class="min-h-72 w-72 max-w-md gap-2 border border-suggest-slate-200 bg-suggest-white"
		id={`suggestion-${suggestionBox.id}`}
	>
		<Card.Header>
			<Card.Title class="text-lg font-bold">
				{suggestionBox.box_title}
			</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-4">
			<div class="space-y-2 text-sm text-suggest-slate-500">
				<div class="truncate text-suggest-slate-600">{suggestionBox.description}</div>
				<div class="space-y-3 pt-2 pb-4">
					<div class="flex items-center gap-2 text-xs">
						<Calendar class="size-4" />
						<div class="flex items-center gap-1">
							<span>Created:</span>
							<p>
								{convertTimeZone(suggestionBox.created_at)}
							</p>
						</div>
					</div>
					<div class="rounded bg-suggest-neutral-50 p-2">
						<div class="flex flex-row-reverse items-center justify-between gap-2 text-xs">
							<Copy
								onclick={() => {
									copyLink(page.url.toString());
									toast.success('Copied!');
								}}
								class="size-4 cursor-pointer"
							/>
							<a href={suggestionBox.url} class="truncate">
								{`${host + suggestionBox.url}`}
							</a>
						</div>
					</div>
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="mt-auto">
			<Button href={suggestionBox.url} variant="default" class="w-full cursor-pointer font-bold">
				View Box
			</Button>
		</Card.Footer>
	</Card.Root>
{/snippet}
