<script lang="ts">
	import LoggedIn from '$lib/components/loggedIn.svelte';
	import * as Item from '$lib/components/ui/item/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { suggestionSchema } from './schema';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { LoaderCircle, LockKeyholeOpen, SendHorizontal, Share2, Trash2 } from 'lucide-svelte';
	import { convertTimeZone, copyLink } from '$lib';

	import { page } from '$app/state';

	let { data } = $props();
	let { box_title, description, suggestions } = $derived(
		data.suggestionBox ?? { box_title: '', description: '', suggestions: [] }
	);

	const session = $derived(data.session);

	const form = superForm(defaults(zod4(suggestionSchema)), {
		validators: zod4(suggestionSchema),
		dataType: 'json'
	});

	const { form: formData, enhance, submitting } = form;
</script>

<svelte:head>
	<title>{box_title} | SuggestBox</title>
	<meta
		name="description"
		content={description
			? description
			: `Submit anonymous suggestions for ${box_title} on SuggestBox.`}
	/>
	<meta
		name="keywords"
		content="suggestion, feedback, anonymous, team, box, SuggestBox, {box_title}"
	/>
	<meta property="og:title" content="{box_title} | SuggestBox" />
	<meta
		property="og:description"
		content={description
			? description
			: `Share your honest feedback for ${box_title} with SuggestBox – a privacy-focused anonymous suggestion box.`}
	/>
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{box_title} | SuggestBox" />
	<meta
		name="twitter:description"
		content={description
			? description
			: `Submit your suggestions for ${box_title} anonymously and easily.`}
	/>
</svelte:head>

<main class="mx-auto mt-4 w-full max-w-3xl">
	<div class="space-y-3">
		<h1 class="text-4xl font-black">{box_title}</h1>
		<p class="mb-8 text-lg">{description}</p>

		<div class="mb-8 flex space-x-8">
			<Button
				onclick={() => {
					copyLink(page.url.toString());
					toast.success('Copied!');
				}}
				size="lg"
				class="w-36 cursor-pointer bg-suggest-blue-700 font-bold transition-colors hover:bg-suggest-blue-700/80"
			>
				<Share2 class="size-5" />
				Share Box</Button
			>
			<form action="?/deleteSuggestionBox" use:enhance method="POST">
				<Button
					type="submit"
					variant="secondary"
					size="lg"
					class="w-36 cursor-pointer bg-suggest-white text-suggest-warning-400 transition-colors hover:bg-suggest-warning-50"
				>
					<Trash2 class="size-5" />
					Delete</Button
				>
			</form>
		</div>
	</div>
	{#if session}
		{#if suggestions.length === 0}
			<LoggedIn />
		{:else}
			<ul class="space-y-3">
				{#each suggestions as suggestion}
					<Item.Root
						variant="outline"
						class="border border-suggest-neutral-100 bg-suggest-white p-6"
					>
						<Item.Header>
							{#if suggestion.name === null}
								<Item.Title class="text-sm font-bold">Anonymous</Item.Title>
							{:else}
								<Item.Title class="text-sm font-bold">
									{suggestion.name}
								</Item.Title>
							{/if}
							<Item.Description class="text-end text-xs text-suggest-slate-600"
								>{convertTimeZone(suggestion.created_at!)}</Item.Description
							>
						</Item.Header>
						<Item.Content>
							<Item.Description class="text-sm leading-6">{suggestion.description}</Item.Description
							>
						</Item.Content>
					</Item.Root>
				{/each}
			</ul>
		{/if}
	{:else}
		<div class="relative mt-8">
			<div
				class="absolute -z-10 h-80 w-full max-w-3xl rounded-xl bg-suggest-blue-700/30 opacity-80 blur-3xl"
			></div>
			<div class="max-w-3xl rounded-2xl bg-suggest-blue-700 p-6 text-suggest-white shadow-2xl">
				<div class="space-y-4 py-8 text-center">
					<div class="mx-auto w-fit rounded-full bg-suggest-blue-100/20 p-4">
						<LockKeyholeOpen />
					</div>
					<h1 class="text-5xl font-black">
						Your voice, <span class="text-suggest-blue-100 italic">untraceable</span>
					</h1>

					<p class="mx-auto mt-6 max-w-[450px] text-xl text-suggest-blue-100">
						We've built a secure tunnel for your thoughts. No logs, no tracking, just complete
						anonymity.
					</p>
				</div>
			</div>

			<Card.Root
				class="mx-auto mt-16 max-w-xl space-y-6 border border-suggest-neutral-100 bg-suggest-white p-10"
			>
				<Card.Header class="p-0">
					<Card.Title class="text-bold text-lg">{description}</Card.Title>
					<Card.Description class="text-suggest-slate-600">
						Be descriptive but avoid sharing personally identifiable information.
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-6 p-0">
					<form class="space-y-8" action="?/submitSuggestion" method="POST" use:enhance>
						<Form.Field {form} name="description">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label class="sr-only font-semibold">Full Name</Form.Label>
									<Input
										{...props}
										bind:value={$formData.name}
										class="w-full bg-suggest-neutral-100 text-sm"
										placeholder="Enter your name (optional)"
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field {form} name="description">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label class="sr-only font-semibold">Description</Form.Label>
									<Textarea
										{...props}
										bind:value={$formData.description}
										class="min-h-28 w-full resize-y bg-suggest-neutral-100 text-sm"
										placeholder="Enter your suggestion"
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<div class="mt-8 flex justify-end">
							<Form.Button
								disabled={$submitting}
								onclick={() => toast.success('Suggestion submitted successfully!')}
								class="w-full cursor-pointer bg-suggest-blue-700 text-suggest-white transition-colors hover:bg-suggest-blue-700/80 disabled:bg-suggest-slate-400"
								size="lg"
							>
								{#if $submitting}
									<LoaderCircle class="mr-2 animate-spin" />
									<span>Submitting...</span>
								{:else}
									<SendHorizontal class="size-5" />
									Submit Suggestion
								{/if}
							</Form.Button>
						</div>
					</form>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}
</main>
