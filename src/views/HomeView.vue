<script setup lang="ts">
import SiteAuthor from '@/components/SiteAuthor.vue'
import { site } from '@/config/site'
import { formatBlogDate } from '@/lib/formatDate'
import { getAllPostsMeta } from '@/lib/posts'

const posts = getAllPostsMeta()
</script>

<template>
  <div class="mx-auto min-h-svh max-w-2xl px-6 py-14 md:py-20">
    <header class="mb-14 md:mb-20">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1
            class="mb-2 text-4xl font-medium tracking-tight text-foreground md:text-[2.75rem] md:leading-tight"
          >
            <RouterLink to="/" class="text-foreground no-underline hover:opacity-80">
              {{ site.title }}
            </RouterLink>
          </h1>
          <p class="text-lg text-muted-foreground md:text-xl">
            {{ site.tagline }}
          </p>
        </div>
        <SiteAuthor />
      </div>
    </header>

    <main>
      <ul class="space-y-10 md:space-y-11">
        <li v-for="post in posts" :key="post.slug">
          <article>
            <h2
              class="mb-1 text-[1.35rem] font-medium leading-snug tracking-tight text-foreground md:text-[1.65rem]"
            >
              <RouterLink
                :to="`/${post.slug}`"
                class="inline-block max-w-full text-[color:var(--blog-link)] no-underline transition-transform duration-200 ease-out hover:scale-[1.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                {{ post.title }}
              </RouterLink>
            </h2>
            <p class="text-[1.05rem] leading-relaxed md:text-[1.125rem]">
              <RouterLink
                :to="`/${post.slug}`"
                class="text-[0.95rem] no-underline md:text-base"
              >
                <span class="text-muted-foreground">{{ formatBlogDate(post.date) }}</span>
                <span v-if="post.description" class="text-foreground">
                  — {{ post.description }}
                </span>
              </RouterLink>
            </p>
          </article>
        </li>
      </ul>
    </main>
  </div>
</template>
