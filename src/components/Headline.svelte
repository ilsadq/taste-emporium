<script>
    import {headlineHexColor, headlineSrc} from "../stores.js";
    import {FastAverageColor} from 'fast-average-color';
    import {ANIMATION_DURATION} from "../SITE.js";
    import {blur} from 'svelte/transition';

    const fac = new FastAverageColor();

    let loaded = false;
    let src = null;
    $: src;

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
             in:blur={{duration: ANIMATION_DURATION, delay: 250}}
             on:load={onLoadHandler}
             height="320"
             width="1920"
             alt="">
    {/key}
</div>

<style lang="sass">
  .headline__wrapper
    @apply overflow-hidden h-56 md:h-80 flex items-center justify-center w-full max-w-[1920px] mx-auto
</style>