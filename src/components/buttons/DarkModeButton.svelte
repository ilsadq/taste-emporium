<script>
    import {Icon, Moon, Sun} from "svelte-hero-icons";
    import {ICON_SIZE} from "../../SITE.js";

    let isDark = false;

    function clickHandler() {
        isDark = !isDark;
    }
</script>

<button on:click={clickHandler} class="flex overflow-hidden w-8 h-8 text-dark justify-center items-center">
    {#if isDark}
        <span>
            <Icon src={Moon} size={ICON_SIZE}/>
        </span>
    {:else}
        <span>
            <Icon src={Sun} size={ICON_SIZE}/>
        </span>
    {/if}
</button>