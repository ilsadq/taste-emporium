<script>
    import {onMount} from 'svelte';
    import PostCard from '../components/PostCard.svelte';
    import {headlineSrc} from '../stores.js';
    import Filters from '../components/Filters.svelte';
    import Loader from '../components/Loader.svelte';
    import PrismicIoAdapter from '$lib/PrismicIoAdapter.js';
    import AutoPagination from '../components/AutoPagination.svelte';
    import {fade} from "svelte/transition";
    import {ANIMATION_DURATION, POST_LIMIT} from "../SITE.js";
    import NotFound from "../components/icons/NotFound.svelte";
    import ScrollBackButton from "../components/buttons/ScrollBackButton.svelte";

    const client = new PrismicIoAdapter();

    //#region Vars
    let showLoader = true;
    let isEnd = false;
    let isError = false;
    let fetching = true;

    let isVisible = false;

    let searchValue = '';

    let posts = [];
    let newPosts = [];

    let page = 0;
    let totalPages = 0;
    //#endregion

    //#region Reactivity
    $: posts = [
        ...posts,
        ...newPosts
    ];

    $: searchHandler(searchValue);
    //#endregion

    //#region Override
    onMount(async () => {
        headlineSrc.set('/headline.webp');
        await loadData();
        showLoader = false;
    });
    //#endregion

    //#region Handlers
    async function searchHandler(value) {
        if (showLoader) return;
        showLoader = true;
        clearPosts();
        fetching = true;
        await loadData(value);
    }

    async function paginationHandler() {
        if (totalPages !== 0 && page + 1 > totalPages || showLoader) return;
        fetching = true;
        await loadData();
    }

    function scrollHandler() {
        isVisible = window.scrollY > window.outerHeight;
    }

    //#endregion

    //#region Extensions
    async function loadData(searchValue = '') {
        client.getPosts(page + 1, searchValue).then(response => {
            newPosts = response.data;
            page = response.page;
            totalPages = response.totalPages;
            isEnd = response.isEnd;
        }).catch(() => isError = true).finally(() => {
            if (showLoader) showLoader = false;
            fetching = false;
        });
    }

    function clearPosts() {
        page = 0;
        posts = [];
        newPosts = [];
    }
    //#endregion
</script>

<div class="md:container 2xl:px-0 px-5">
    <div class="page__wrapper">
        <Filters bind:searchValue/>
        {#if showLoader}
            <div class="loader__wrapper" in:fade={{duration: ANIMATION_DURATION, delay: 100}}>
                <Loader/>
            </div>
        {:else}
            {#if posts.length > 0}
                <AutoPagination {fetching} on:load={paginationHandler}>
                    <ul class="content__wrapper">
                        {#each posts as post, i}
                            <li in:fade={{duration: ANIMATION_DURATION, delay: 35 * i}}>
                                <PostCard {...post}/>
                            </li>
                        {/each}
                    </ul>
                </AutoPagination>
            {:else if posts.length === 0 && isEnd}
                <div class="not-found__wrapper">
                    <article class="not-found">
                        <NotFound/>
                        <h4>Not Found</h4>
                    </article>
                </div>
            {/if}
        {/if}
        {#if isEnd && posts.length > POST_LIMIT && !showLoader}
            <div class="flex flex-col justify-center items-center gap-x-2.5">
                <ScrollBackButton/>
            </div>
        {/if}
    </div>
</div>

{#if isVisible}
    <div class="fixed right-4 bottom-4">
        <ScrollBackButton/>
    </div>
{/if}

<svelte:window on:scroll={scrollHandler}/>

<style lang="sass">
  .loader__wrapper
    @apply flex justify-center

  .page__wrapper
    @apply py-10 bg-white min-h-screen

  .content__wrapper
    @apply grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pt-10 sm:gap-5 pb-10

  .not-found__wrapper
    @apply grid place-content-center
    .not-found
      @apply flex flex-col text-center

      h4
        @apply text-6xl -translate-y-1/2 font-bold text-primary
</style>
