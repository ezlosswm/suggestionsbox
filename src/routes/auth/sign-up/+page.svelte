<script lang="ts">
	import google from '$lib/assets/google-color.svg';
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
		<Card.Title class="text-3xl leading-9 font-black -tracking-wider"
			>Create your account</Card.Title
		>
		<Card.Description class="text-suggest-slate-600"
			>Join SuggestBox to start sharing ideas and improving your products</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid space-y-6">
				<Form.Field class="grid gap-2" {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Full Name</Form.Label>
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
				<Form.Button
					aria-label="Create Account"
					class="cursor-pointer bg-suggest-blue-700 text-suggest-white hover:bg-suggest-blue-700/80"
				>
					{#if $submitting}
						<span><LoaderCircle class="animate-spin" /></span>Creating Account
					{:else}
						Create Account
					{/if}
				</Form.Button>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 space-y-4">
		<div
			class="flex w-full items-center gap-3 text-xs font-medium tracking-[0.2em] text-suggest-slate-400 uppercase"
		>
			<div class="h-px flex-1 bg-suggest-slate-200"></div>
			<span>Or sign in with</span>
			<div class="h-px flex-1 bg-suggest-slate-200"></div>
		</div>
		<Button
			aria-label="Sign Up with Google"
			href="/auth/login/google"
			variant="outline"
			class="w-full cursor-pointer"
		>
			<img src={google} alt="Google logo" />
			Sign Up with Google
		</Button>

		<div class="text-sm text-suggest-slate-600">
			Already have an account? <span
				><Button
					aria-label="Log In"
					variant="link"
					class="text-suggest-slate-600"
					href="/auth/login">Log In</Button
				></span
			>
		</div>
	</Card.Footer>
</Card.Root>
