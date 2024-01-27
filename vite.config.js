
import { sveltekit } from '@sveltejs/kit/vite';

import { defineConfig } from 'vite';

export default defineConfig({

    plugins: [
        sveltekit()

    ],
    // sentrySvelteKit({
    // autoInstrument: false,
    // sourceMapsUploadOptions: {
    // 	org: 'ben-woodward',
    // 	project: 'spoken-webapp',
    // },

    // ssr: {
    //     noExternal: ['vanilla-cookieconsent']
    // },
    // build: {
    //     target: 'esnext',
    //     sourcemap: false,
    //     minify: 'terser',
    //     rollupOptions: {
    //         output: {
    //             sourcemap: 'hidden', // hide inline source maps
    //         },
    //     },
    // },
    build: {
        sourcemap: true
    },

});