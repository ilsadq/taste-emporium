<script>
    import {onMount} from 'svelte';
    import PostCard from '../components/PostCard.svelte';
    import {headlineSrc} from '../stores.js';
    import Filters from '../components/Filters.svelte';
    import Loader from '../components/Loader.svelte';
    import PrismicIoAdapter from '$lib/PrismicIoAdapter.js';
    import AutoPagination from '../components/AutoPagination.svelte';
    import {fade} from "svelte/transition";
    import {ANIMATION_DURATION} from "../SITE.js";

    const client = new PrismicIoAdapter();

    let isFirstRender = true;

    let posts = [];
    let newPosts = [];

    let fetching = false;
    let page = 0;
    let totalPages = 0;

    $: posts = [
        ...posts,
        ...newPosts
    ]

    // TODO Подумать как решить проблему с отображением Not Found при загрузке страницы
    // TODO Подумать как выовдить список найденых постов
    // TODO Добавить для карточек скелеты

    onMount(async () => {
        headlineSrc.set(null);
        getData().finally(() => isFirstRender = false);
        headlineSrc.set('/headline.webp');
    });

    async function searchData(value) {
        clearPosts();
        client.getSearchPosts(value, page + 1).then(response => {
            newPosts = response.data;
            page = response.page;
        }).finally(() => fetching = false);
    }

    async function getData() {
        if (totalPages !== 0 && page + 1 > totalPages) return;
        client.getPosts(page + 1).then(response => {
            newPosts = response.data;
            page = response.page;
            totalPages = response.totalPages;
        }).finally(() => fetching = false);
    }

    async function fetchHandler({detail}) {
        fetching = true;
        await getData();
    }

    function clearPosts() {
        page = 0;
        posts = [];
        newPosts = [];
    }
</script>

<div class="lg:container lg:px-0 px-4">
    <div class="page__wrapper">
        <Filters on:search={fetchHandler}/>
        {#if isFirstRender}
            <div class="loader__wrapper">
                <Loader/>
            </div>
        {:else}
            {#if Array.isArray(posts) && posts.length > 0}
                <AutoPagination {fetching} on:load={fetchHandler}>
                    <ul class="content__wrapper">
                        {#each posts as post, i}
                            <li in:fade={{duration: ANIMATION_DURATION, delay: 35 * i}}>
                                <PostCard {post}/>
                            </li>
                        {/each}
                    </ul>
                </AutoPagination>
            {:else}
                <div class="not-found__wrapper">
                    <article class="not-found">
                        <img src="/NotFound.webp" alt="Not found" width="384" height="384"/>
                        <h4>Not Found</h4>
                    </article>
                </div>
            {/if}
        {/if}
    </div>
</div>

<style lang="sass">
  .loader__wrapper
    @apply flex justify-center

  .page__wrapper
    @apply py-10 bg-white min-h-screen

  .content__wrapper
    @apply grid md:grid-cols-2 lg:grid-cols-3 pt-10 sm:gap-5

  .not-found__wrapper
    @apply grid place-content-center
    .not-found
      @apply flex flex-col text-center
      img
        @apply w-96 h-96
      h4
        @apply text-6xl -translate-y-1/2 font-bold text-primary
</style>
