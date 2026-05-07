<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
import { site } from '@/config/site'
</script>

<template>
  <div class="flex shrink-0 items-center gap-3 font-sans text-sm">
    <span class="text-muted-foreground">
      by <span class="font-medium text-foreground">{{ site.author }}</span>
    </span>
    <img
      :src="site.avatarSrc"
      :alt="`${site.author}'s avatar`"
      class="size-9 shrink-0 rounded-full object-cover ring-1 ring-border"
      width="36"
      height="36"
      loading="lazy"
      decoding="async"
    />
    <ThemeToggle />
  </div>
</template>
