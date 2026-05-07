/** Format `YYYY-MM-DD` (or ISO) for display without timezone surprises. */
export function formatBlogDate(iso: string): string {
  if (!iso) return ''
  const normalized = iso.length === 10 ? `${iso}T12:00:00` : iso
  const d = new Date(normalized)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
