<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

const isDark = ref(false)

function apply() {
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = stored === 'dark' || (!stored && prefersDark)
  apply()
})

function toggle() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  apply()
}
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    class="shrink-0 font-sans"
    type="button"
    aria-label="Toggle color theme"
    @click="toggle"
  >
    <Sun v-if="isDark" class="size-5" />
    <Moon v-else class="size-5" />
  </Button>
</template>
