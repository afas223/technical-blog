import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

/**
 * GitHub Pages:
 * - 仓库名为 `用户名.github.io` → 站点在根域名，`base` 必须是 `/`
 * - 其他仓库名 → 站点在 `https://用户名.github.io/仓库名/`，`base` 为 `/仓库名/`
 */
function githubPagesBase(): string {
  if (process.env.GITHUB_PAGES !== 'true') return '/'
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
  if (!repo) return '/'
  if (repo.toLowerCase().endsWith('.github.io')) return '/'
  return `/${repo}/`
}

export default defineConfig({
  base: githubPagesBase(),
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
