<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { CircleUser } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-12 px-8 md:px-40 lg:flex-row lg:px-80">
	<div class="max-w-xl space-y-4">
		<div>
			<h1 class="text-4xl font-black tracking-tight text-suggest-navy-900 md:text-6xl">
				Gather feedback that actually
				<span class="text-suggest-blue-700">matters.</span>
			</h1>
		</div>
		<p class="text-lg text-suggest-slate-600">
			The simplest way to collect, manage, and act on suggestions from your team or customers. No
			more messy spreadsheets or lost emails.
		</p>
		<Button
			class="cursor-pointer bg-suggest-blue-700 px-8 py-6 text-base shadow-lg hover:bg-suggest-blue-700/80 md:text-lg"
			size="lg">Create Your Box</Button
		>
	</div>

	<div class="relative my-auto">
		<div
			class="absolute h-64 rounded-full bg-suggest-blue-700/20 opacity-80 blur-3xl sm:w-150"
		></div>

		<!-- Card -->
		<div class="relative z-10 rounded-xl bg-white p-6 text-suggest-navy-900 shadow-xl sm:w-150">
			<div class="mb-4 flex items-center justify-between">
				<div class="flex items-center gap-3 text-sm">
					<CircleUser class="size-10 stroke-suggest-slate-600 stroke-1" />
					<div>
						<p class="font-bold">Anonymous</p>
						<p class="text-suggest-slate-600">2 minutes ago</p>
					</div>
				</div>
			</div>

			<h2 class="mb-2 text-lg font-bold">"Add dark mode support for the dashboard"</h2>

			<p class="mb-4 text-sm text-gray-600">
				It would be great for power users who spend hours working on feedback at night. Dark mode is
				easy on the eyes.
			</p>

			<div class="flex justify-end">
				<Button variant="ghost" class="font-medium text-suggest-blue-700">Join discussion</Button>
			</div>
		</div>
	</div>
</div>
