<script setup lang="ts">
import SiteAuthor from '@/components/SiteAuthor.vue'
import { site } from '@/config/site'
import { formatBlogDate } from '@/lib/formatDate'
import { getPost } from '@/lib/posts'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const post = computed(() => getPost(slug.value))
</script>

<template>
  <div v-if="post" class="mx-auto min-h-svh max-w-2xl px-6 py-10 md:py-14">
    <header class="mb-10 flex flex-wrap items-center justify-between gap-4">
      <RouterLink
        to="/"
        class="text-lg font-medium text-foreground no-underline hover:opacity-80"
      >
        {{ site.title }}
      </RouterLink>
      <SiteAuthor />
    </header>

    <article>
      <header class="mb-10">
        <h1
          class="mb-3 text-[1.85rem] font-medium leading-tight tracking-tight text-foreground md:text-[2.25rem]"
        >
          {{ post.title }}
        </h1>
        <p class="text-muted-foreground">
          {{ formatBlogDate(post.date) }}
        </p>
      </header>

      <div
        class="prose prose-lg max-w-none font-serif prose-headings:font-serif prose-p:leading-[1.78] prose-pre:bg-muted prose-pre:text-foreground dark:prose-invert prose-a:text-[color:var(--blog-link)] prose-a:no-underline hover:prose-a:underline prose-a:decoration-[color:var(--blog-link)] prose-code:text-[0.9em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none"
        v-html="post.html"
      />
    </article>

    <footer class="mt-16 border-t border-border pt-8">
      <RouterLink
        to="/"
        class="text-[color:var(--blog-link)] no-underline hover:underline"
      >
        ← {{ site.title }}
      </RouterLink>
    </footer>
  </div>

  <div
    v-else
    class="mx-auto flex min-h-svh max-w-2xl flex-col px-6 py-16 md:py-24"
  >
    <header class="mb-8 flex justify-end">
      <SiteAuthor />
    </header>
    <div class="flex flex-1 flex-col items-start justify-center">
      <h1 class="mb-2 text-3xl font-medium">Page not found</h1>
      <p class="mb-6 text-muted-foreground">
        There is no post at <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{{ slug }}</code>.
      </p>
      <RouterLink
        to="/"
        class="text-[color:var(--blog-link)] no-underline hover:underline"
      >
        ← Back home
      </RouterLink>
    </div>
  </div>
</template>
