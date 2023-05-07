import { writable } from 'svelte/store';

// Headline image url
export const headlineSrc = writable(null);

// Headline average picture color
export const headlineHexColor = writable({
    color: '',
    isDark: false
});
