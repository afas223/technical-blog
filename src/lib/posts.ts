import { parseFrontmatter } from '@/lib/frontmatter'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({ html: false, linkify: true, breaks: true })

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
}

export interface ParsedPost extends PostMeta {
  html: string
}

const rawGlob = import.meta.glob('../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  const base = path.split('/').pop() ?? ''
  return base.replace(/\.md$/i, '')
}

function metaFromRaw(raw: string, slug: string): PostMeta {
  const { data } = parseFrontmatter(raw)
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    description: String(data.description ?? ''),
  }
}

export function getAllPostsMeta(): PostMeta[] {
  return Object.entries(rawGlob)
    .map(([path, raw]) => metaFromRaw(raw, slugFromPath(path)))
    .filter((p) => p.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): ParsedPost | undefined {
  const entry = Object.entries(rawGlob).find(
    ([path]) => slugFromPath(path) === slug,
  )
  if (!entry) return undefined
  const [, raw] = entry
  const { content } = parseFrontmatter(raw)
  const meta = metaFromRaw(raw, slug)
  return {
    ...meta,
    html: md.render(content),
  }
}
