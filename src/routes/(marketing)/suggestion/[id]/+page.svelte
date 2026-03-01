<script lang="ts">
	import LoggedIn from '$lib/components/loggedIn.svelte';
	import * as Item from '$lib/components/ui/item/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { suggestionSchema } from './schema';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { LoaderCircle } from 'lucide-svelte';
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

<main class="mx-auto w-full max-w-3xl">
	{#if session}
		{#if suggestions.length === 0}
			<LoggedIn />
		{:else}
			<!-- Menu to handle suggestions -->
			<ButtonGroup.Root class="mb-8">
				<Button
					variant="secondary"
					onclick={() => {
						copyLink(page.url.toString());
						toast.success('Copied!');
					}}
					size="lg"
					class="cursor-pointer">Share</Button
				>
				<ButtonGroup.Separator />
				<form action="?/deleteSuggestion" method="POST" use:enhance>
					<Button type="submit" variant="destructive" size="lg" class="cursor-pointer"
						>Delete</Button
					>
				</form>
			</ButtonGroup.Root>

			<ul class="space-y-3">
				{#each suggestions as suggestion}
					<Item.Root variant="muted">
						<Item.Content class="space-y-1">
							<Item.Title class="font-normal">{suggestion.description}</Item.Title>
							<Item.Description class="text-end text-sm font-thin"
								>{convertTimeZone(suggestion.created_at!)}</Item.Description
							>
						</Item.Content>
					</Item.Root>
				{/each}
			</ul>
		{/if}
	{:else}
		<div class="mb-8">
			<h1 class="text-3xl font-medium">{box_title}</h1>
		</div>
		<Card.Root class="space-y-1">
			<Card.Header class="space-y-2">
				<Card.Description>
					We want your feedback! We gurantee your suggestion will be read and considered.
				</Card.Description>
				<Card.Title>{description}</Card.Title>
			</Card.Header>
			<form class="space-y-3 p-3" action="?/submitSuggestion" method="POST" use:enhance>
				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="sr-only">Description</Form.Label>
							<Textarea
								{...props}
								bind:value={$formData.description}
								class="min-h-28 w-full resize-y"
								placeholder="Enter your suggestion"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description class="text-sm">
						Provide as much detail as you'd like to help us understand your suggestion. (500
						character limit)
					</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<div class="mt-8 flex justify-end">
					<Form.Button
						onclick={() => toast.success('Suggestion submitted successfully!')}
						class="cursor-pointer border bg-blue-500 text-white hover:bg-blue-600"
					>
						{#if $submitting}
							<LoaderCircle class="mr-2 animate-spin" />
							<span>Submitting...</span>
						{:else}
							<span>Submit Suggestion</span>
						{/if}
					</Form.Button>
				</div>
			</form>
		</Card.Root>
	{/if}
</main>
