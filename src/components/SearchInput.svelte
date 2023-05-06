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
    @apply h-10 w-80 border-secondary shadow-sm form-input rounded-lg focus:border-primary focus:ring-1 focus:ring-primary
</style>