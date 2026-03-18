import { fetchTypeFilter } from '#server/services/FilterService.js'
import { environments } from '#server/common/constants/environments.js'

export default async function (request) {
  const typeFilters = await fetchTypeFilter()

  return {
    pageTitle: 'CDP Dependency Explorer - Dependency - Vulnerabilities',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { type: 'npm', environment: 'prod', ...request.query },
    path: request.path,
    typeFilters: typeFilters.map((t) => ({ value: t, text: t }))
  }
}
