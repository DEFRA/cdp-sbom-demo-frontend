import { fetchTypeFilter } from '#server/services/FilterService.js'
import { environments } from '#server/common/constants/environments.js'
import { fetchUsage } from '#server/services/SearchService.js'

let typeFilters = null

export default async function (request) {
  if (!typeFilters) {
    typeFilters = await fetchTypeFilter()
  }

  let results = []

  if (request.query?.type) {
    results = await fetchUsage(request.query)
  }

  return {
    pageTitle: 'CDP Dependency Explorer - Usage',
    heading: 'Usage',
    caption: 'Dependency usage metrics',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { type: 'npm', ...request.query },
    typeFilters: typeFilters.map((t) => ({ value: t, text: t })),
    results: results.map((r) => [
      { text: r.name },
      { text: r.version },
      { text: r.count }
    ])
  }
}
