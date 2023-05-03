<script>
    import '../app.sass';
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import Headline from '../components/Headline.svelte';
    import {page} from '$app/stores'
    import Transition from "../components/Transition.svelte";
</script>

<div class="wrapper">
    <div class="header__wrapper">
        <div class="container">
            <Header/>
        </div>
    </div>
    <Headline/>
    <main class="main__wrapper">
        <Transition url={$page.url}>
            <slot/>
        </Transition>
    </main>
    <div class="footer__wrapper">
        <div class="container">
            <Footer/>
        </div>
    </div>
</div>

<style lang="sass">
  .wrapper
    @apply flex flex-col

  .header__wrapper
    @apply bg-white shadow sticky top-0 left-0 right-0 z-50

  .main__wrapper
    @apply flex-auto min-h-screen

  .footer__wrapper
    @apply bg-primary
</style>
