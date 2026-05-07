/** Minimal `---` YAML frontmatter for simple `key: value` lines (no nesting). Browser-safe. */
export function parseFrontmatter(raw: string): {
  data: Record<string, string>
  content: string
} {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!m) return { data: {}, content: raw }

  const yamlBlock = m[1]
  const content = m[2]
  const data: Record<string, string> = {}

  for (const line of yamlBlock.split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    data[key] = val
  }

  return { data, content }
}
