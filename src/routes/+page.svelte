<script>
    import PostCard from '../components/PostCard.svelte';
    import {onDestroy, onMount} from 'svelte';
    import {headlineSrc} from '../stores.js';
    import Filters from '../components/Filters.svelte';
    import Loader from '../components/Loader.svelte';
    import PrismicIoAdapter from '$lib/PrismicIoAdapter.js';
    import AutoPagination from '../components/AutoPagination.svelte';
    import {fade} from "svelte/transition";
    import {ANIMATION_DELAY, ANIMATION_DURATION} from "../SITE.js";

    let client = new PrismicIoAdapter();
    let posts = Promise.resolve([]);
    let fetching = false;
    let page = 0;

    onMount(() => {
        headlineSrc.set(null);
        posts = client.getPosts(page);
        headlineSrc.set('/headline.webp');
    });

    onDestroy(() => {
        posts = Promise.resolve([]);
    })

    async function searchHandler(value) {
        if (!value) posts = client.getPosts(page);
        else posts = client.getSearchPosts(value.detail);
    }

    async function loadData() {
        fetching = true;
    }
</script>

<div class="lg:container lg:px-0 px-4">
    <div class="page__wrapper">
        <Filters on:search={searchHandler}/>
        {#await posts}
            <div class="loader__wrapper">
                <Loader/>
            </div>
        {:then data}
            {#if Array.isArray(data) && data.length > 0}
                <AutoPagination {fetching} on:load={loadData}>
                    <ul class="content__wrapper">
                        {#each data as post, i}
                            <li in:fade={{duration: ANIMATION_DURATION, delay: ANIMATION_DELAY * i}}>
                                <PostCard {post}/>
                            </li>
                        {/each}
                    </ul>
                </AutoPagination>
            {:else}
                <div class="grid place-content-center">
                    <article class="flex flex-col text-center">
                        <img class="w-96 h-96" src="/NotFound.webp" alt="Not found" width="384" height="384"/>
                        <h4 class="text-6xl -translate-y-1/2 font-bold text-primary">Not Found</h4>
                    </article>
                </div>
            {/if}
        {:catch error}
            <div class="grid place-content-center">
                <article class="flex flex-col text-center">
                    <img class="w-96 h-96" src="/BadDay.webp" alt="error" width="384" height="384">
                    <h4 class="text-6xl -translate-y-1/2 font-bold text-error">Error...</h4>
                </article>
            </div>
        {/await}
    </div>
</div>

<style lang="sass">
  .loader__wrapper
    @apply flex justify-center min-h-screen

  .page__wrapper
    @apply py-10 bg-white min-h-screen

  .content__wrapper
    @apply grid md:grid-cols-2 lg:grid-cols-3 pt-10 sm:gap-5
</style>
