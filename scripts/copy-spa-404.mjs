import { copyFileSync, existsSync } from 'node:fs'

const index = 'dist/index.html'
const notFound = 'dist/404.html'

if (!existsSync(index)) {
  console.error('Missing dist/index.html — run `npm run build` first.')
  process.exit(1)
}

copyFileSync(index, notFound)
console.log('GitHub Pages SPA: copied dist/index.html → dist/404.html')
