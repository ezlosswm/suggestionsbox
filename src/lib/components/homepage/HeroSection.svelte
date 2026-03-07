<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import Card from '$lib/components/homepage/Card.svelte';
</script>

<div class="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 lg:flex-row">
	<div class="mx-auto max-w-xl space-y-4">
		<div>
			<h1 class="min-h-30 text-4xl font-black tracking-tight text-suggest-navy-900 md:text-6xl">
				Gather feedback that actually
				<span class="text-suggest-blue-700">matters.</span>
			</h1>
		</div>
		<p class="text-lg text-suggest-slate-600">
			The simplest way to collect, manage, and act on suggestions from your team or customers. No
			more messy spreadsheets or lost emails.
		</p>
		<Button
			aria-label="Create your box"
			class="cursor-pointer bg-suggest-blue-700 px-8 py-6 text-base shadow-lg hover:bg-suggest-blue-700/80 md:text-lg"
			size="lg">Create Your Box</Button
		>
	</div>

	<div class="pointer-events-none relative mx-auto my-auto">
		<div
			class="absolute h-64 rounded-full bg-suggest-blue-700/20 opacity-80 blur-3xl sm:w-150"
		></div>

		<div class="relative inset-x-0">
			<div class="z-40 shadow">
				<Card />
			</div>
			<div class="absolute inset-y-0 z-5 rotate-8">
				<Card />
			</div>
			<div class="absolute inset-y-0 z-5 -rotate-5">
				<Card />
			</div>
		</div>
	</div>
</div>
