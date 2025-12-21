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

<div class="mx-auto mt-20 flex w-full max-w-xl flex-col gap-6">
	<Card.Root>
		<Card.Header>
			<Card.Title>Profile</Card.Title>
			<Card.Description
				>Make changes to your account here. Click save when you're done.</Card.Description
			>
		</Card.Header>
		<Card.Content class="grid gap-6">
			<form method="POST" use:enhance>
				<div class="flex flex-col gap-6">
					<Form.Field class="grid gap-3" {form} name="name"></Form.Field>
					<div class="grid gap-2">
						<Label for="name">Name</Label>
						<Input id="name" type="text" placeholder="John Doe" disabled />
					</div>
					<Button class="w-full cursor-pointer" disabled>Save changes</Button>
				</div>
			</form>
			<Button onclick={deleteAccount} variant="destructive" class="w-full cursor-pointer"
				>Delete Account</Button
			>
		</Card.Content>
	</Card.Root>
</div>
