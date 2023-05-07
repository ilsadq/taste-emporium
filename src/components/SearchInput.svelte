<script>
    import {ANIMATION_DURATION} from "../SITE.js";
    import {fade} from 'svelte/transition';

    export let value = '';
    let timer;

    const debounce = v => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            value = v;
        }, 750);
    }
</script>

<input on:keyup={({ target: { value } }) => debounce(value)}
       transition:fade={{duration: ANIMATION_DURATION}}
       class="search--input"
       type="text"
       placeholder="Поиск...">

<style lang="sass">
  .search--input
    @apply h-10 w-80 prose border-secondary shadow-sm form-input rounded-lg focus:border-primary focus:ring-1 focus:ring-primary
</style>