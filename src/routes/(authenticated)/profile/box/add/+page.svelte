<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema } from './schema';
	import { LoaderCircle } from 'lucide-svelte';
	import { Textarea } from '$lib/components/ui/textarea';

	const form = superForm(defaults(zod4(formSchema)), {
		validators: zod4(formSchema),
		dataType: 'json'
	});

	const { form: formData, enhance, submitting } = form;
</script>

<Card.Root class="border-none">
	<Card.Header>
		<Card.Title class="text-2xl">New Suggestion Box</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid space-y-6">
				<Form.Field class="grid gap-2" {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Name</Form.Label>
							<Input {...props} bind:value={$formData.name} placeholder="John Doe" />
						{/snippet}
					</Form.Control>
					<Form.Description class="text-sm">
						A good name is short and to the point. For example, <span class="italic"
							>Bake Sale Ideas</span
						>
						or <span class="italic"> Company Vacation Policy </span>.
					</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field class="grid gap-2" {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Textarea
								{...props}
								bind:value={$formData.description}
								placeholder="Description (optional)"
							/>
							<!-- <Input
								{...props}
								bind:value={$formData.description}
								type="text"
								placeholder="Description (optional)"
							/> -->
						{/snippet}
					</Form.Control>
					<Form.Description class="text-sm">
						You can provide additional details or instructions about the feedback you're looking
						for.
					</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button class="w-fit cursor-pointer justify-end">
					{#if $submitting}
						<span>
							<LoaderCircle class="animate-spin" />
						</span>Signing Up
					{:else}
						Create Suggestion Box
					{/if}
				</Form.Button>
			</div>
		</form>
	</Card.Content>
</Card.Root>
