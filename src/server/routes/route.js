import { fetchSearch } from '#server/services/SearchService.js'
import { fetchTypeFilter } from '#server/services/FilterService.js'

const environments = [
  '',
  'latest',
  'dev',
  'test',
  'perf-test',
  'ext-test',
  'prod'
]

let typeFilters = null

export default async function (request) {
  if (!typeFilters) {
    typeFilters = await fetchTypeFilter()
  }

  let results = []

  if (request.query?.type && request.query?.name) {
    results = await fetchSearch(request.query)
  }
  console.log(results)
  return {
    pageTitle: 'CDP Dependency Explorer - Search',
    heading: 'Search',
    caption: 'Search for dependencies used by services',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { type: 'npm', ...request.query },
    typeFilters: typeFilters.map((t) => ({ value: t, text: t })),
    results: results.map((r) => [
      { text: r.depversion },
      { html: `<strong>${r.name}</strong>  (${r.version})` }
    ])
  }
}
