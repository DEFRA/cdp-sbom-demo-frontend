export default async function searchDependencyName(value) {
  const type = document.querySelector('select#type').value
  const response = await fetch(
    `${location.origin}/deps-search?type=${type}&partialName=${value}`,
    {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }
  )
  const json = await response.json()

  if (response?.ok) {
    return json.suggestions
  }

  throw new Error(json.message)
}
