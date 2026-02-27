<script lang="ts">
	import HeroSection from '$lib/components/homepage/HeroSection.svelte';
	import TrustedCompanies from '$lib/components/homepage/TrustedCompanies.svelte';
	import HowItWorks from '$lib/components/homepage/HowItWorks.svelte';

	import CTAFooter from '$lib/components/homepage/CTAFooter.svelte';
</script>

<section class="mx-auto flex min-h-[calc(100dvh-6rem)] items-center bg-suggest-neutral-50 p-2">
	<HeroSection />
</section>

<section class="border-suggest-neutral-200 border-t border-b bg-white">
	<TrustedCompanies />
</section>

<section>
	<HowItWorks />

	<div class="px-4">
		<CTAFooter />
	</div>
</section>
