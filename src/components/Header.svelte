<script>
    import HeaderProgress from "../components/HeaderProgress.svelte";
    import {page} from '$app/stores'
    import {Icon, ArrowLeft} from "svelte-hero-icons";
    import {ANIMATION_DURATION, ICON_SIZE} from "../SITE.js";
    import {goto} from "$app/navigation";
    import {fly} from "svelte/transition";

    let isPostContent;
    $: isPostContent = $page.url.href.includes('/posts');
</script>

<header class="header">
    {#if isPostContent}
        <button transition:fly={{duration: ANIMATION_DURATION, delay: 150, x: -150}}
                on:click={() => goto('/')} class="back--button">
            <Icon src={ArrowLeft} size={ICON_SIZE}/>
        </button>
    {/if}
    <div class="title">
        <a href="/">Taste Emporium</a>
    </div>
    <HeaderProgress/>
</header>

<style lang="sass">
  .header
    @apply h-20 flex items-center justify-between overflow-x-hidden

    .title
      @apply text-2xl text-primary font-bold whitespace-nowrap

    .back--button
      @apply lg:hidden rounded-full border border-primary text-primary min-w-[2.5rem] min-h-[2.5rem] w-10 h-10 flex items-center justify-center
</style>
