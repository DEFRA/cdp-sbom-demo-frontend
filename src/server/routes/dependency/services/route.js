import { fetchSearch } from '#server/services/SearchService.js'
import { fetchTypeFilter } from '#server/services/FilterService.js'
import { environments } from '#server/common/constants/environments.js'

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
      {
        html: `<a href="/dependency/services?type=${request.query.type}&dependency=${request.query.dependency}&environment=${request.query.environment}&version=${r.depversion}">${r.depversion}</a>`
      },
      {
        html: `<a href="/service/?service=${r.name}&environment=${request.query.environment}&version="><strong>${r.name}</strong></a> (<a href="/service/?service=${r.name}&environment=${request.query.environment}&version=${r.version}">${r.version}</a>)`
      },
      { text: '' }
    ])
  }
}
