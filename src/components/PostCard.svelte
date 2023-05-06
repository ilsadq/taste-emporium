<script>
    import {Icon, Clock} from "svelte-hero-icons";
    import {ICON_SIZE} from "../SITE.js";

    export let post;

    const url = `/posts/${post.uid}`;
</script>

<article class="card">
    <div class="card__image--wrapper">
        <a href={url}>
            <img src={post.imageUrl} alt={post.title} width="354" height="184">
        </a>
    </div>
    <div class="card__content">
        <div class="card__content--time">
            <Icon src={Clock} size={ICON_SIZE} class="text-secondary"/> {post.cookingTime} мин
        </div>
        <div class="card__content--title">
            <a href={url}>{post.title}</a>
        </div>
    </div>
</article>

<style lang="sass">
  .card
    @apply rounded-lg shadow-sm md:h-72 overflow-hidden
    &:hover
      img
        @apply scale-105

    &__image--wrapper
      @apply overflow-hidden md:h-[184px]
      img
        @apply transition-transform w-full md:w-auto

    &__content
      @apply px-4 py-3.5
      &--title
        @apply text-xl font-medium text-ellipsis text-dark
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical

      &--time
        @apply text-secondary flex gap-x-1.5 items-center

  .skeleton
    @apply bg-secondary bg-opacity-40 animate-pulse rounded-lg
</style>