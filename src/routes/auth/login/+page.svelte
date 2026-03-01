<script lang="ts">
	import { defaults, superForm } from 'sveltekit-superforms';
	import google from '$lib/assets/google-color.svg';

	import { zod4 } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema } from './schema';
	import { LoaderCircle } from 'lucide-svelte';

	const form = superForm(defaults(zod4(formSchema)), {
		validators: zod4(formSchema)
	});

	const { form: formData, enhance, submitting } = form;

	// let { data } = $props();
</script>

<Card.Root class="mx-auto mt-20 w-full max-w-md">
	<Card.Header class="space-y-8">
		<Card.Title>
			<div class="flex items-center gap-2">
				<svg
					class="size-6 fill-suggest-blue-700"
					fill="currentColor"
					viewBox="0 0 48 48"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"></path>
				</svg>
				<h1 class="text-xl font-bold -tracking-wider">SuggestBox</h1>
			</div>
		</Card.Title>
		<div class="space-y-2">
			<Card.Title class="text-3xl leading-9 font-black -tracking-wider">Welcome back</Card.Title>
			<Card.Description class="text-suggest-slate-600"
				>Enter your credentials to access your account</Card.Description
			>
		</div>
		<Card.Action>
			<Button variant="link" href="/auth/sign-up" class="cursor-pointer">Sign Up</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid space-y-4">
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
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button
					class="cursor-pointer bg-suggest-blue-700 text-suggest-white hover:bg-suggest-blue-700/80"
				>
					{#if $submitting}
						<span><LoaderCircle class="animate-spin" /></span>
						Submitting
					{:else}
						Sign In
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
		<Button href="/auth/login/google" variant="outline" class="w-full cursor-pointer">
			<img src={google} alt="Google logo" />
			Sign in with Google</Button
		>
	</Card.Footer>
</Card.Root>
