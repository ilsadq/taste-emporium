<script>
    import {Icon, ChevronUp} from 'svelte-hero-icons'
    import {ANIMATION_DURATION, ICON_SIZE} from "../../SITE.js";
    import {fade} from 'svelte/transition'

    function clickHandler() {
        document.body.scrollIntoView({
            behavior: 'smooth'
        });
    }
</script>

<button on:click={clickHandler} transition:fade={{duration: ANIMATION_DURATION}} class="scroll-top__button">
    <Icon src={ChevronUp} size={ICON_SIZE}/>
</button>

<style lang="sass">
  .scroll-top__button
    @apply rounded-full border border-primary text-primary w-10 h-10
    @apply bg-primary bg-opacity-5 hover:bg-opacity-20 transition-colors
    @apply flex items-center justify-center leading-none
</style>