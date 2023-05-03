<script>
    import Backdrop from "./Backdrop.svelte";

    let isVisible = false;
</script>

<button on:click={() => isVisible = true} class="filter-button">Фильтры</button>

<Backdrop bind:isVisible>
    <article class="bg-white rounded-lg p-5 flex gap-x-5">
        <h1>Модалка с фильтрами</h1>
        <button on:click={() => isVisible = false}>Close</button>
    </article>
</Backdrop>

<style lang="sass">
    .filter-button
      @apply h-10 w-28 rounded-lg leading-none font-medium border border-primary text-primary
</style>