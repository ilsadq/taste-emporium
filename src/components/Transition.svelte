<script>
    import {fly} from "svelte/transition";
    import {ANIMATION_DELAY, ANIMATION_DURATION} from "../SITE.js";

    export let url = '';
</script>

{#key url}
    <div in:fly={{y: 100, duration: ANIMATION_DURATION, delay: ANIMATION_DELAY}}>
        <slot/>
    </div>
{/key}