<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema } from './schema';
	import { LoaderCircle } from 'lucide-svelte';

	const form = superForm(defaults(zod4(formSchema)), {
		validators: zod4(formSchema),
		dataType: 'json'
	});

	const { form: formData, enhance, submitting } = form;
</script>

<Card.Root class="mx-auto mt-20 w-full max-w-md">
	<Card.Header>
		<Card.Title class="text-xl">Signup</Card.Title>
		<Card.Description>Enter your information below to create your account</Card.Description>
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
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field class="grid gap-2" {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input
								{...props}
								bind:value={$formData.email}
								type="email"
								placeholder="example@example.com"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field class="grid gap-2" {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input
								{...props}
								type="password"
								placeholder="********"
								bind:value={$formData.password}
							/>
						{/snippet}
					</Form.Control>
					<Form.Description>Must be at least 8 characters long.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field class="grid gap-2" {form} name="confirm">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm Password</Form.Label>
							<Input
								{...props}
								type="password"
								placeholder="********"
								bind:value={$formData.confirm}
							/>
						{/snippet}
					</Form.Control>
					<Form.Description>Please confirm your password.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button class="cursor-pointer">
					{#if $submitting}
						<span><LoaderCircle class="animate-spin" /></span>Signing In
					{:else}
						Sign Up
					{/if}
				</Form.Button>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex-col gap-2">
		<Button href="/auth/login/google" variant="outline" class="w-full cursor-pointer">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path
					d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
					fill="currentColor"
				/>
			</svg>
			Sign Up with Google
		</Button>

		<div class="text-sm text-gray-300">
			Already have an account? <span
				><Button variant="link" class="text-gray-300" href="/auth/login">Sign In</Button></span
			>
		</div>
	</Card.Footer>
</Card.Root>
