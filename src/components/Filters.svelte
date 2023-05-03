<script>
    import SearchInput from "./SearchInput.svelte";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<div class="filter__wrapper">
    <div class="filter__wrapper--title">
        <h1>Browse by Course</h1>
        <div>Найдите идеальный рецепт для завтрака, обеда или ужина.</div>
    </div>
    <div class="filter__wrapper--actions">
        <SearchInput on:search={x => dispatch('search', x.detail)}/>
<!--        <div class="buttons__wrapper">-->
<!--            <FilterButton/>-->
<!--            <button class="h-10 w-28 rounded-lg leading-none font-medium border border-primary text-primary">Категории</button>-->
<!--        </div>-->
    </div>
</div>

<style lang="sass">
  .filter__wrapper
    @apply flex flex-col gap-y-4
    &--title
      @apply flex flex-col gap-y-2.5 text-dark
      h1
        @apply text-4xl font-medium
    &--actions
      @apply flex justify-between
      .buttons__wrapper
        @apply flex gap-x-5 items-end
</style>