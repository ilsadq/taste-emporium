<script>
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {Icon, Clock, Printer, ArrowLeft} from "svelte-hero-icons";
    import {headlineSrc} from "../../../stores.js";
    import Loader from "../../../components/Loader.svelte";
    import {ICON_SIZE} from "../../../SITE.js";
    import PrismicIoAdapter from "$lib/PrismicIoAdapter.js";
    import BadDay from "../../../components/icons/BadDay.svelte";

    const client = new PrismicIoAdapter();

    let promise = Promise.resolve();
    let more = false;

    onMount(async () => {
        headlineSrc.set('');
        promise = client.getPostContent($page.params.uid);
        headlineSrc.set((await promise).imageUrl);
    })
</script>

<svelte:head>
    {#await promise}
        <title>Taste Emporium</title>
        {:then data}
        <title>{data.title}</title>
    {/await}
</svelte:head>

<div class="page__wrapper">
    <button on:click={() => goto(import.meta.env.BASE_URL)} class="back__button">
        <Icon src={ArrowLeft} size={ICON_SIZE} class="text-primary"/>
    </button>
    <div class="page">
        {#await promise}
            <div class="loader__wrapper">
                <Loader/>
            </div>
        {:then data}
            <div class="content__wrapper">
                <div class="title__wrapper">
                    <h1 class="title__wrapper--title">{data.title}</h1>
                    <div class="title__wrapper--actions">
                        <div class="flex flex-nowrap text-dark gap-x-2.5 items-center">
                            <Icon src={Clock} size={ICON_SIZE} class="text-dark"/>
                            <span class="text-sm whitespace-nowrap">{data.cookingTime} мин</span>
                        </div>
                        <button on:click={() => window.print()} class="hidden md:flex gap-x-2.5 items-center text-dark">
                            <Icon src={Printer} size={ICON_SIZE} class="text-dark"/>
                            <span class="text-sm">Распечатать</span>
                        </button>
                    </div>
                </div>
                <hr class="bg-dark">
                <div class="description custom-scroll">
                    <div class:more class="des">{data.description}</div>
                    <button on:click={() => more = !more} class:more class="more__button">
                        Подробнее
                    </button>
                </div>
                <div class="energy-value__wrapper">
                    <h4 class="section-title">ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ НА ПОРЦИЮ</h4>
                    <div class="energy-value__wrapper--content">
                        <article class="card">
                            <div class="card__title">КАЛОРИЙНОСТЬ</div>
                            <div class="card__value">{data.calories}</div>
                            <div class="card__abbreviation">ККАЛ</div>
                        </article>
                        <article class="card">
                            <div class="card__title">БЕЛКИ</div>
                            <div class="card__value">{data.proteins}</div>
                            <div class="card__abbreviation">ГРАММ</div>
                        </article>
                        <article class="card">
                            <div class="card__title">ЖИРЫ</div>
                            <div class="card__value">{data.fats}</div>
                            <div class="card__abbreviation">ГРАММ</div>
                        </article>
                        <article class="card">
                            <div class="card__title">УГЛЕВОДЫ</div>
                            <div class="card__value">{data.carbohydrates}</div>
                            <div class="card__abbreviation">ГРАММ</div>
                        </article>
                    </div>
                </div>
                <hr class="bg-dark">
                <div class="ingredients__wrapper">
                    <h4 class="section-title">ИНГРЕДИЕНТЫ</h4>
                    <ul class="ingredients__wrapper--content">
                        {#each data.ingredients as item}
                            <li class="item">
                                <span class="bg-white leading-none">{item.title}</span>
                                <div class="flex-auto border-b border-dashed border-secondary"></div>
                                <span class="bg-white leading-none">{item.value}</span>
                            </li>
                        {/each}
                    </ul>
                </div>
                <div class="instruction__wrapper">
                    <h4 class="section-title">ИНСТРУКЦИЯ ПРИГОТОВЛЕНИЯ</h4>
                    <ul class="instruction__wrapper--content">
                        {#each data.instruction as item, i}
                            <li class="item">
                                <div class="item__image">
                                    {#if item.imageUrl}
                                        <img src={item.imageUrl} alt="" class="prose-2xl">
                                    {/if}
                                </div>
                                <div class="item__content">
                                    <h6 class="item__content--step">Шаг {i + 1}</h6>
                                    <p class="item__content--description prose">{item.description}</p>
                                </div>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        {:catch error}
            <div class="error__wrapper">
                <BadDay/>
                <h4>Error</h4>
            </div>
        {/await}
    </div>
</div>

<style lang="sass">
  .loader__wrapper
    @apply flex justify-center min-h-screen bg-white

  .error__wrapper
    @apply flex flex-col min-h-screen items-center justify-center
    h4
      @apply text-primary text-6xl font-bold

  .page__wrapper
    @apply relative flex bg-white
    .page
      @apply lg:container z-20 px-4 bg-white rounded-lg lg:-translate-y-20 lg:-translate-x-8

  .back__button
    @apply hidden sticky left-0 top-0 m-0 h-screen w-16 bg-opacity-10 bg-primary opacity-0 hover:opacity-100 lg:flex items-center justify-center

  .section-title
    @apply hidden lg:block font-medium md:font-bold text-dark prose-2xl

  .content__wrapper
    @apply py-10 flex flex-col gap-y-8 md:gap-y-10

  .title__wrapper
    @apply flex flex-wrap md:flex-nowrap justify-between items-center md:items-start gap-2.5 md:gap-x-10
    &--title
      @apply text-2xl lg:text-5xl font-bold text-dark

    &--actions
      @apply flex flex-col gap-y-2.5 ml-auto

  .description
    @apply text-dark prose-xl lg:prose-lg relative text-ellipsis transition
    .des
      @apply h-56 lg:h-auto overflow-y-hidden
      &.more
        @apply h-auto overflow-y-auto

    .more__button
      @apply h-16 lg:hidden rounded-lg prose-xl bg-primary text-white w-full absolute bottom-0 left-0 ring-0
      box-shadow: 0 0 24px rgba(0, 0, 0, 0.5)

      &.more
        @apply hidden

  .energy-value__wrapper
    @apply lg:h-52 flex flex-col gap-y-5

    &--content
      @apply flex flex-col lg:flex-row lg:items-center lg:justify-center gap-y-6 lg:gap-x-16
      .card
        @apply flex lg:flex-col lg:h-36 lg:gap-y-2 justify-start lg:justify-center items-start lg:items-center prose-xl text-dark font-medium lg:px-6 lg:py-4
        &__value
          @apply lg:font-bold ml-auto lg:ml-0

        &__abbreviation
          @apply lg:text-base ml-2.5 lg:ml-0

  .ingredients__wrapper
    @apply flex flex-col gap-y-5
    &--content
      @apply grid gap-y-5
      .item
        @apply flex justify-between prose-lg lg:prose-base items-end text-dark gap-x-1 lg:px-10

  .instruction__wrapper
    @apply flex flex-col gap-y-5
    &--content
      @apply lg:px-10 flex flex-col gap-y-10 md:max-w-[1000px]
      .item
        @apply min-h-[20rem] grid grid-rows-[14rem_auto] lg:grid-rows-1 xl:grid-cols-2 gap-y-5 xl:gap-y-0 gap-x-5
        &__image
          @apply w-full
          img
            @apply w-full h-full lg:h-80 rounded-lg

        &__content
          @apply flex flex-col
          &--step
            @apply prose-2xl md:prose-xl text-center text-dark

          &--description
            @apply text-dark prose-lg lg:prose
</style>