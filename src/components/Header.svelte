<script>
    import HeaderProgress from "../components/HeaderProgress.svelte";
    import DarkModeButton from "./buttons/DarkModeButton.svelte";
</script>

<header class="header">
    <div class="title">
        <a href="/">Taste Emporium</a>
    </div>
    <DarkModeButton/>
    <HeaderProgress/>
</header>

<style lang="sass">
  .header
    @apply h-20 flex items-center justify-between

    .title
      @apply text-2xl text-primary font-bold
</style>
