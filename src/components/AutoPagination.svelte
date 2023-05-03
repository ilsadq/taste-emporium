<script>
    import { createEventDispatcher } from 'svelte';

    export let fetching = false;

    const dispatch = createEventDispatcher();

    function scrollHandler() {
        const scrollProgress = Math.ceil((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (scrollProgress >= 80 && !fetching) dispatch('load', true);
    }
</script>

<slot/>

<svelte:window on:scroll={scrollHandler} />