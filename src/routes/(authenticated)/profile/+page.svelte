<script lang="ts">
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { formSchema } from './schema';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Form from '$lib/components/ui/form/index.js';

	import { deleteAccount } from '$lib/index';

	const form = superForm(defaults(zod4(formSchema)), {
		validators: zod4(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<svelte:head>
	<title>Profile | SuggestBox</title>
	<meta name="description" content="Manage your SuggestBox profile." />
</svelte:head>

<div class="mx-auto mt-20 flex w-full max-w-2xl flex-col gap-6">
	<Card.Root class="ring-none border-none bg-suggest-neutral-50 shadow-none hover:shadow-none">
		<Card.Header class="mb-8 space-y-2">
			<Card.Title class="text-4xl font-black">Profile Settings</Card.Title>
			<Card.Description class="text-lg text-suggest-slate-600"
				>Update your personal information and account preferences</Card.Description
			>
		</Card.Header>
		<Card.Content class="grid gap-6">
			<h4 class="text-xl font-bold">Personal Information</h4>

			<form method="POST" use:enhance>
				<div class="flex gap-6">
					<Form.Field class="grid w-full gap-2" {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Full Name</Form.Label>
								<Input
									{...props}
									bind:value={$formData.name}
									type="text"
									placeholder="John Doe"
									disabled
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field class="grid w-full gap-2" {form} name="email">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Email Address</Form.Label>
								<Input
									{...props}
									bind:value={$formData.email}
									type="email"
									placeholder="alex@example.com"
									disabled
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="flex justify-end pt-2">
					<Form.Button
						class="cursor-pointer bg-suggest-blue-700 font-bold text-suggest-white hover:bg-suggest-blue-700/80"
						size="lg"
						disabled>Save Changes</Form.Button
					>
				</div>
			</form>
			<div
				class="mt-24 rounded-xl border border-suggest-warning-100 bg-suggest-warning-50 p-8 text-center md:text-start"
			>
				<div class="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-24">
					<div class="space-y-1">
						<h4 class="text-lg font-bold text-suggest-warning-400">Delete Account</h4>
						<p class="text-sm text-suggest-warning-300">
							Once you delete your account, there is no going back. Please be certain before
							proceeding.
						</p>
					</div>
					<Form.Button
						onclick={deleteAccount}
						variant="destructive"
						disabled
						class="cursor-pointer bg-suggest-warning-400 ">Delete Account</Form.Button
					>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
