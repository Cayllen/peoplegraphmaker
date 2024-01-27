import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { importAssets } from 'svelte-preprocess-import-assets';



/** @type {import('@sveltejs/kit').Config}*/
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    extensions: ['.svelte'],
    kit: {

        adapter: adapter({
            routes: { include: ['/*'], exclude: ['<all>', '/sitemap.xml'] },


        }),//'/sitemap.xml'
        alias: {
            $cmp: './src/routes/components',
        }
    },
    preprocess: [
        vitePreprocess(),
        importAssets({
            // Include URLs with specific extensions only
            urlFilter: (url) => /lib/.test(url)
        })
    ],
};
export default config;
