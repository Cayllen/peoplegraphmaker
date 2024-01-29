<script>
	import { onMount } from 'svelte';
	import * as VCC from 'vanilla-cookieconsent';
	import config from '$lib/cookieconsent-config';
	import 'vanilla-cookieconsent/dist/cookieconsent.css';

	/**
	 * Only run plugin on the client side
	 */
	onMount(() => {
		VCC.run(config);
	});
</script>
