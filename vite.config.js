import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	base: '/',
	server: {
		host: '0.0.0.0',
		cors: true
	}
});
