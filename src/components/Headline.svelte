<script>
    import {headlineHexColor, headlineSrc} from "../stores.js";
    import {FastAverageColor} from 'fast-average-color';
    import {ANIMATION_DURATION} from "../SITE.js";
    import {blur} from 'svelte/transition';

    const fac = new FastAverageColor();

    let loaded = false;
    let src = null;

    $: src;
    $: loaded;

    headlineSrc.subscribe(async (value) => {
        loaded = false;
        src = value;

        if (!value) return;

        let color = await fac.getColorAsync(value);
        headlineHexColor.set({
            color: color.rgb,
            isDark: color.isDark
        });
    })

    function onLoadHandler() {
        loaded = true;
    }
</script>

<div class="headline__wrapper" style="--data-color: {$headlineHexColor}">
    {#key src}
        <img {src}
             in:blur={{duration: ANIMATION_DURATION, delay: 150}}
             on:load={onLoadHandler}
             height="320"
             width="1920"
             alt="">
        {#if !loaded}
            <div in:blur={{delay: 200, duration: 0}}
                 class="absolute inset-0 bg-secondary bg-opacity-30 animate-pulse z-10"></div>
        {/if}
    {/key}
</div>

<style lang="sass">
  .headline__wrapper
    @apply overflow-hidden relative h-56 lg:h-80 flex items-center justify-center w-full max-w-[1920px] mx-auto text-white
    img
      @apply min-h-full
</style>