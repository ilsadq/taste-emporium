<script>
    import {Icon, Moon, Sun} from "svelte-hero-icons";
    import {ICON_SIZE} from "../../SITE.js";
    import {slide} from 'svelte/transition';

    let isDark = false;
</script>

<button on:click={() => isDark = !isDark} class="flex overflow-hidden w-8 h-8 justify-center items-center">
    {#if isDark}
        <span in:slide class="text-secondary">
            <Icon src={Moon} size={ICON_SIZE}/>
        </span>
    {:else}
        <span in:slide class="text-primary">
            <Icon src={Sun} size={ICON_SIZE}/>
        </span>
    {/if}
</button>