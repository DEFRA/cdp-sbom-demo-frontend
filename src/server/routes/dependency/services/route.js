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

export default async function (request) {
  const typeFilters = await fetchTypeFilter()

  let results = []

  if (request.query?.type && request.query?.dependency) {
    results = await fetchSearch(request.query)
  }

  return {
    pageTitle: 'CDP Dependency Explorer - Dependency - Services',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { type: 'npm', environment: 'latest', ...request.query },
    path: request.path,
    typeFilters: typeFilters.map((t) => ({ value: t, text: t })),
    results: results.map((r) => [
      { text: r.depversion },
      { html: `<strong>${r.name}</strong>  (${r.version})` },
      { text: '' }
    ])
  }
}
