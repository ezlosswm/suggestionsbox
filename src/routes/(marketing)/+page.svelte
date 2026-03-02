<script lang="ts">
	import HeroSection from '$lib/components/homepage/HeroSection.svelte';
	import TrustedCompanies from '$lib/components/homepage/TrustedCompanies.svelte';
	import HowItWorks from '$lib/components/homepage/HowItWorks.svelte';

	import CTAFooter from '$lib/components/homepage/CTAFooter.svelte';
</script>

<svelte:head>
	<title>SuggestBox</title>
	<meta
		name="description"
		content="Collect anonymous suggestions and feedback with SuggestBox, your privacy-first suggestion box for teams, communities, and organizations."
	/>
	<meta
		name="keywords"
		content="anonymous feedback, suggestion box, suggestion app, team feedback, employee feedback, privacy-first"
	/>
	<meta name="author" content="SuggestBox" />
	<meta property="og:title" content="SuggestBox" />
	<meta
		property="og:description"
		content="Collect anonymous suggestions and feedback with SuggestBox, your privacy-first suggestion box for teams, communities, and organizations."
	/>
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="SuggestBox" />
	<meta
		name="twitter:description"
		content="Collect anonymous suggestions and feedback with SuggestBox, your privacy-first suggestion box for teams, communities, and organizations."
	/>
</svelte:head>

<section class="mx-auto flex min-h-[calc(100dvh-6rem)] items-center bg-suggest-neutral-50 p-2">
	<HeroSection />
</section>

<section class="border-suggest-neutral-200 mt-12 border-t border-b bg-white md:mt-0">
	<TrustedCompanies />
</section>

<section>
	<HowItWorks />

	<div class="px-4">
		<CTAFooter />
	</div>
</section>
