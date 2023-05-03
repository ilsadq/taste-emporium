<script>
    import InstagramIcon from "../components/icons/InstagramIcon.svelte";
    import GithubIcon from "../components/icons/GithubIcon.svelte";
</script>

<footer class="footer">
    <div class="footer--logo">
        <a href="/">Taste Emporium</a>
    </div>
    <ul class="footer--creators">
        <li>Дизайн: <a target="_blank" href="https://www.instagram.com/_rrrryya/">R4Y2A</a></li>
        <li>Фронтенд: <a target="_blank" href="https://github.com/ilsadq">ADQ</a></li>
    </ul>
    <ul class="footer--links">
        <li>
            <a target="_blank" href="https://www.instagram.com/_rrrryya/">
                <InstagramIcon/>
            </a>
        </li>
        <li>
            <a target="_blank" href="https://github.com/ilsadq">
                <GithubIcon/>
            </a>
        </li>
    </ul>
</footer>

<style lang="sass">
  .footer
    @apply h-24 flex items-center justify-between
    &--logo
      @apply text-xl text-white font-bold

    &--creators
      @apply text-xl text-white font-medium flex flex-col gap-y-2.5


    &--links
      @apply flex flex-col gap-y-2.5
</style>