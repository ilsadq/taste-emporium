<script>
    import {Icon, ChevronUp} from 'svelte-hero-icons'
    import {ANIMATION_DURATION, ICON_SIZE} from "../../SITE.js";
    import {fade} from 'svelte/transition'

    let isVisible = false;

    function scrollHandler() {
        isVisible = window.scrollY > window.outerHeight;
    }

    function clickHandler() {
        document.body.scrollIntoView({
            behavior: 'smooth'
        });
    }
</script>

{#if isVisible}
    <button on:click={clickHandler} transition:fade={{duration: ANIMATION_DURATION}} class="scroll-top__button" class:isVisible>
        <Icon src={ChevronUp} size={ICON_SIZE}/>
    </button>
{/if}

<svelte:window on:scroll={scrollHandler}/>

<style lang="sass">
  .scroll-top__button
    @apply fixed right-4 bottom-4
    @apply rounded-full border border-primary text-primary w-10 h-10
    @apply bg-primary bg-opacity-5 hover:bg-opacity-20 transition-colors
    @apply flex items-center justify-center leading-none
</style>