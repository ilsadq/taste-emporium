<script>
    import SearchInput from "./SearchInput.svelte";

    export let searchValue = '';
</script>

<div class="filter__wrapper">
    <div class="filter__wrapper--title">
        <h1>Browse by Course</h1>
        <div>Найдите идеальный рецепт для завтрака, обеда или ужина.</div>
    </div>
    <div class="filter__wrapper--actions">
        <div class="search__wrapper">
            <SearchInput bind:value={searchValue}/>
        </div>
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