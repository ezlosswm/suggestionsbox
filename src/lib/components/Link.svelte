<script lang="ts">
	import { Card } from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';

	import { CircleStop, Trash } from 'lucide-svelte';

	let status: 'active' | 'disabled' = 'active';

	const colors = {
		active: 'bg-green-600',
		disabled: 'bg-red-600'
	};

	const statusColor = colors[status];
</script>

<Card
	class="relative mx-auto w-full max-w-md overflow-hidden rounded-xl bg-foreground/1 p-4 shadow-xs dark:bg-foreground/5"
>
	<!-- Glow effect -->
	<div
		class={`pointer-events-none absolute -top-1 -left-0.5 size-8 rounded-full ${statusColor} opacity-70 blur-xl`}
	></div>

	<div class="flex space-x-3">
		<div class={`mb-4 size-4 rounded-full ${statusColor}`}></div>
		<div class="flex w-full gap-3">
			<div class="w-full rounded-md border border-border bg-muted p-2">
				<p class=" text-gray-500 dark:text-gray-300">www.example.com/user/xxxxx</p>
			</div>
			<ButtonGroup.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button class="cursor-pointer" variant="secondary">
							<CircleStop />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Disable link</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button class="cursor-pointer" variant="destructive">
							<Trash />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Delete link</Tooltip.Content>
				</Tooltip.Root>
			</ButtonGroup.Root>
		</div>
	</div>
</Card>
