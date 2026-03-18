import { fetchTypeFilter } from '#server/services/FilterService.js'
import { environments } from '#server/common/constants/environments.js'
import { fetchUsage } from '#server/services/SearchService.js'

export default async function (request) {
  const typeFilters = await fetchTypeFilter()

  let results = []

  if (request.query?.type && request.query?.dependency) {
    results = await fetchUsage(request.query)
  }

  return {
    pageTitle: 'CDP Dependency Explorer - Dependency',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { type: 'npm', environment: 'latest', ...request.query },
    path: request.path,
    typeFilters: typeFilters.map((t) => ({ value: t, text: t })),
    results: results.map((r) => [
      { text: r.version },
      { text: r.count },
      { text: '0' }
    ])
  }
}
