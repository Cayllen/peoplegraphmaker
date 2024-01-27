<script>
	// NOTE: This section is meant to be placed on every page. This puts the correct meta tags on every page.
	export let pageTitle;
	export let pageDescription;
	export let pageKeywords = '';
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{pageTitle}</title>
	<meta name="title" content={pageTitle} />

	<meta name="description" content={pageDescription} />
	{#if pageKeywords.length}
		<meta name="keywords" content={pageKeywords} />
	{/if}
	<!-- Open Graph / Facebook -->
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />

	<!-- Twitter -->
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
</svelte:head>
