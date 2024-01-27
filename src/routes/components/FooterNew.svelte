<script>
	import { reveal, setDefaultOptions } from 'svelte-reveal';

	export let navigationMenu;
</script>

<footer use:reveal={{ delay: 200 }} class="relative w-full pb-5 backdrop-invert backdrop-opacity-5">
	<div
		class="flex flex-col items-center justify-between gap-5 border-t border-zinc-900/5 pt-8 dark:border-white/5 sm:mx-10 sm:mt-20 sm:flex-row"
	>
		<div class="mx-3 flex flex-row gap-5">
			<p class="text-xs text-zinc-600 dark:text-zinc-400">
				© Copyright 2024. All rights reserved.
			</p>
			<a href="/legal-notice" class="text-xs text-zinc-600 dark:text-zinc-400">Legal notice</a>
			<a href="/privacy-policy" class="text-xs text-zinc-600 dark:text-zinc-400">Privacy policy</a>
		</div>
	</div>
</footer>
