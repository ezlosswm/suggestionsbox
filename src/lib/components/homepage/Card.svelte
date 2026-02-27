<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { CircleUser } from 'lucide-svelte';
</script>

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
