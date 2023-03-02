export function formatDate(dateString: string) {
  if (!dateString) return ''
  if (dateString.charAt(dateString.length - 1) === 'Z')
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })

  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
