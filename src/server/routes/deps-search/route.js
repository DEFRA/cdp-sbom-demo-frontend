import { fetchUniqueDependencies } from '#server/services/FilterService.js'

export async function GET(request) {
  const results = await fetchUniqueDependencies(request.query)

  return {
    suggestions: results.map(({ name }) => ({ text: name, value: name }))
  }
}
