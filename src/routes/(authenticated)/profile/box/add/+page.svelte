<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema } from './schema';
	import { ArrowRight, LoaderCircle } from 'lucide-svelte';
	import { Textarea } from '$lib/components/ui/textarea';

	const form = superForm(defaults(zod4(formSchema)), {
		validators: zod4(formSchema)
		// dataType: 'json'
	});

	const { form: formData, enhance, submitting } = form;
</script>

<svelte:head>
	<title>New Suggestion Box | SuggestBox</title>
	<meta name="description" content="Create a new feedback collection channel." />
</svelte:head>

<Card.Root class="border-none">
	<Card.Header class="space-y-2">
		<Card.Title class="text-2xl font-bold">Create a New Suggestion Box</Card.Title>
		<Card.Description class="mb-6 text-suggest-slate-600">
			Suggestion boxes are the central hubs for collecting feedback. Once created, you can invite
			team members and start receiving anonymous or identified submissions.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid space-y-6">
				<Form.Field class="grid gap-2" {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="font-semibold">Suggestion Box Name</Form.Label>
							<Input
								{...props}
								bind:value={$formData.name}
								placeholder="e.g., Q4 Product Strategy Feedback"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description class="text-xs text-suggest-slate-600">
						A good name is short and to the point...
					</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field class="grid gap-2" {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="font-semibold">Description & Instructions</Form.Label>
							<Textarea
								{...props}
								bind:value={$formData.description}
								placeholder="Explain what kind of feedback you're looking for..."
							/>
						{/snippet}
					</Form.Control>
					<Form.Description class="text-xs text-suggest-slate-600">
						Detailed instructions help users provide more actionable feedback.
					</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<div class="flex justify-end">
					<Form.Button
						disabled={$submitting}
						size="lg"
						class="w-fit cursor-pointer justify-end bg-suggest-blue-700 text-suggest-white hover:bg-suggest-blue-700/80"
					>
						{#if $submitting}
							<span>
								<LoaderCircle class="animate-spin" />
							</span>Creating Suggestion Box
						{:else}
							Create Suggestion Box <span>
								<ArrowRight class="size-5" />
							</span>
						{/if}
					</Form.Button>
				</div>
			</div>
		</form>
	</Card.Content>
</Card.Root>
