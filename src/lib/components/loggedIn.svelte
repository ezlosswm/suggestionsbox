<script lang="ts">
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { Copy, Check } from 'lucide-svelte';

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

<section class="space-y-3 text-center">
	<h1 class="text-2xl font-medium">Your suggestion box has been created!</h1>
	<p>
		The link to your suggestion box is blow. You can send it to others and start collecting
		feedback!
	</p>

	<div class="mt-6">
		<div class="flex items-center justify-center gap-2 text-blue-600 hover:underline">
			<p class="w-fit text-center">
				{page.url}
			</p>

			{#if copyStatus}
				<div id="copy-status">
					<Check class="size-5 text-green-600" />
				</div>
			{:else}
				<Copy
					onclick={() => {
						copyLink();
						toast.success('Copied!');
					}}
					class="size-4 cursor-pointer"
				/>
			{/if}
		</div>
	</div>
</section>
