<script>
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {Icon, Clock, Printer, ArrowLeft} from "svelte-hero-icons";
    import {headlineSrc} from "../../../stores.js";
    import Loader from "../../../components/Loader.svelte";
    import {ICON_SIZE} from "../../../SITE.js";
    import PrismicIoAdapter from "$lib/PrismicIoAdapter.js";

    const client = new PrismicIoAdapter();

    let promise = Promise.resolve([]);

    onMount(async () => {
        headlineSrc.set(null);
        promise = client.getPostContent($page.params.uid);
        promise.then(x => headlineSrc.set(x.imageUrl));
    })
</script>

<div class="page__wrapper">
    <button on:click={() => goto('/')} class="back__button">
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
                        <div class="flex text-dark gap-x-2.5 items-center">
                            <Icon src={Clock} size={ICON_SIZE} class="text-dark"/>
                            <span class="text-sm">{data.cookingTime} мин</span>
                        </div>
                        <button on:click={() => window.print()} class="flex gap-x-2.5 items-center text-dark">
                            <Icon src={Printer} size={ICON_SIZE} class="text-dark"/>
                            <span class="text-sm">Распечатать</span>
                        </button>
                    </div>
                </div>
                <hr class="bg-dark">
                <div class="description">{data.description}</div>
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
                                        <img src={item.imageUrl} alt="">
                                    {/if}
                                </div>
                                <div class="item__content">
                                    <div class="item__content--step">Шаг {i + 1}</div>
                                    <div class="item__content--description">{item.description}</div>
                                </div>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        {:catch error}
            <pre>{error}</pre>
        {/await}
    </div>
</div>

<style lang="sass">
  .loader__wrapper
    @apply flex justify-center min-h-screen bg-white

  .page__wrapper
    @apply relative flex
    .page
      @apply container bg-white rounded-lg -translate-y-20 md:-translate-x-8

  .back__button
    @apply sticky left-0 top-0 m-0 h-screen w-16 bg-opacity-10 bg-primary opacity-0 hover:opacity-100 flex items-center justify-center

  .section-title
    @apply text-2xl font-bold text-dark

  .content__wrapper
    @apply py-10 flex flex-col gap-y-10

  .title__wrapper
    @apply flex justify-between
    &--title
      @apply text-5xl font-bold text-dark

    &--actions
      @apply flex flex-col gap-y-2.5

  .description
    @apply text-dark

  .energy-value__wrapper
    @apply h-52 flex flex-col gap-y-5

    &--content
      @apply flex items-center justify-center gap-x-16
      .card
        @apply flex flex-col h-36 gap-y-2 justify-center items-center text-xl text-dark font-medium px-6 py-4
        &__value
          @apply font-bold

        &__abbreviation
          @apply text-base

  .ingredients__wrapper
    @apply flex flex-col gap-y-5
    &--content
      @apply grid gap-y-5
      .item
        @apply flex justify-between items-end text-dark gap-x-1 px-10

  .instruction__wrapper
    @apply flex flex-col gap-y-5
    &--content
      @apply px-10 flex flex-col gap-y-10 items-center max-w-[1000px]
      .item
        @apply h-80 grid grid-cols-2 gap-x-5
        &__image
          @apply w-full overflow-hidden rounded-lg
          img
            @apply w-full h-full

        &__content
          @apply flex flex-col gap-y-6
          &--step
            @apply text-xl text-center text-dark

          &--description
            @apply text-dark
</style>