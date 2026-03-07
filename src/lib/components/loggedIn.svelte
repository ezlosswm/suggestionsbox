<script lang="ts">
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { Copy, Check } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index';

	let copyStatus = $state(false);

	async function copyLink() {
		navigator.clipboard.writeText(page.url.toString()).then(
			() => {
				copyStatus = true;
				setTimeout(() => {
					copyStatus = false;
				}, 2000);
			},
			(error) => {
				alert('Failed to copy link: ');
			}
		);
	}
</script>

<section
	class="mx-auto mt-16 h-64 max-w-2xl space-y-3 rounded-xl border-2 border-dotted bg-suggest-white p-6 text-center"
>
	<div class="grid place-items-center">
		<div>
			<h1 class="text-2xl font-bold">No suggestions yet</h1>
			<p class="text-suggest-slate-600">
				Share your link with your community to start gathering feedback.
			</p>
		</div>

		<Button
			aria-label="Copy Share Link"
			onclick={() => {
				copyLink();
				toast.success('Copied!');
			}}
			class="w-60 cursor-pointer bg-suggest-blue-700 p-6 text-base font-bold text-suggest-white transition-colors hover:bg-suggest-blue-700/80"
			size="lg"
		>
			<Copy class="size-6" />
			Copy Share Link
		</Button>
	</div>
</section>
