import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess(),

	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		target: '#svelte',
		adapter: adapter(),
		prerender: {
			crawl: true,
			enabled: true,
			onError: 'continue',
			pages: ['*'],
		  },		    
	},
};

export default config;
