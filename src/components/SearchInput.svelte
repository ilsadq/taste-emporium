<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let timer;

    const debounce = v => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            dispatch('search', v);
        }, 750);
    }
</script>

<input on:keyup={({ target: { value } }) => debounce(value)} class="search--input" type="text" placeholder="Поиск...">

<style lang="sass">
  .search--input
    @apply h-10 w-80 text-dark rounded-lg border border-secondary px-4 leading-none focus:outline-primary
</style>