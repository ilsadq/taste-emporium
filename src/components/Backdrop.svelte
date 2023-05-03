<script>
    import {fade} from "svelte/transition";
    import {ANIMATION_DURATION} from "../SITE.js";
    import {spring} from "svelte/motion";

    export let isVisible = false;

    const scaleSprint = spring(0, { stiffness: 0.05, damping: 0.05 });

    $: if (typeof document !== "undefined") {
        document.body.style.overflow = (isVisible) ? showModal() : hideModal();
    }

    function showModal() {
        scaleSprint.set(1);
        return 'hidden';
    }

    function hideModal() {
        scaleSprint.set(0).then(() => isVisible = false);
        return 'auto';
    }

    function keydownHandler(args) {
        if (args.key === 'Escape') hideModal();
    }
</script>

{#if $scaleSprint !== 0}
    <div on:click={hideModal}
         on:keydown={keydownHandler}
         transition:fade={{duration: ANIMATION_DURATION}}
         class="backdrop"
         tabindex="-1">
        <div style="scale: {$scaleSprint}" on:click|stopPropagation>
            <slot/>
        </div>
    </div>
{/if}

<style lang="sass">
  .backdrop
    @apply fixed inset-0 bg-dark bg-opacity-10 backdrop-blur-sm z-50 grid place-content-center outline-primary
</style>