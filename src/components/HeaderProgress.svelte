<script>
    import {tweened} from "svelte/motion";
    import {cubicOut} from "svelte/easing";
    import {ANIMATION_DURATION} from "../SITE.js";

    const progress = tweened(0, {
        duration: ANIMATION_DURATION,
        easing: cubicOut
    })

    let progressElement;

    progress.subscribe(value => {
        if (progressElement) progressElement.style.width = `${value}%`;
    });

    function scrollHandler() {
        const scrollProgress = Math.ceil((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        progress.set(scrollProgress);
    }
</script>

<div class="progress" bind:this={progressElement}></div>

<svelte:window on:scroll={scrollHandler}/>

<style lang="sass">
    .progress
        @apply h-1 bg-primary absolute left-0 top-0 rounded-r-lg
</style>