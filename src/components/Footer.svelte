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
    @apply md:h-24 grid grid-cols-2 grid-rows-2 gap-y-5 gap-x-2.5 md:gap-0 md:flex md:items-center justify-between py-5 lg:py-0
    &--logo
      @apply text-xl text-white font-bold

    &--creators
      @apply text-xl text-white font-medium justify-end flex flex-col gap-y-2.5

    &--links
      @apply flex justify-start md:flex-col gap-2.5
</style>