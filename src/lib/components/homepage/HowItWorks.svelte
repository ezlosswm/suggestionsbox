<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Lightbulb, Link, Vote } from 'lucide-svelte';
</script>

<div class="space-y-16 px-2 py-24">
	<div class="space-y-4 text-center">
		<h2 class="text-4xl leading-10 font-black tracking-tighter">How It Works</h2>
		<p class="text-lg text-suggest-slate-600">
			Three simple steps to bridge the gap between you and your community.
		</p>
	</div>

	<div class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-2 text-center md:flex-row">
		{@render card(
			'link',
			'Share a link',
			'Send your private or public link to your customers or team members.'
		)}

		{@render card(
			'bulb',
			'Collect ideas',
			'Receive anonymous suggestions without friction or account creation.'
		)}

		{@render card(
			'priority',
			'Take Action',
			'Easily sort and prioritize ideas based on community votes and feedback.'
		)}
	</div>
</div>

{#snippet card(icon: string, title: string, description: string)}
	<div
		class="flex flex-col items-center gap-2 space-y-4 rounded-lg border border-suggest-slate-200 bg-suggest-white p-8 text-center shadow-sm"
	>
		<!-- icon -->
		<Button variant="outline" class="bg-suggest-blue-700/10 p-6 text-suggest-blue-700" size="icon">
			{#if icon === 'link'}
				<Link class="size-6" />
			{:else if icon === 'bulb'}
				<Lightbulb class="size-6" />
			{:else if icon === 'priority'}
				<Vote class="size-6" />
			{:else}
				<p>?</p>
			{/if}
		</Button>

		<div class="px-4">
			<h3 class="mb-4 text-xl font-bold">{title}</h3>
			<p class="text-suggest-slate-600">{description}</p>
		</div>
	</div>
{/snippet}
