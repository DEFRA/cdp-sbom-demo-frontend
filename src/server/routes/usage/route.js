import { fetchTypeFilter } from '#server/home/helpers/fetch-filters.js'
import { navigation } from '#server/common/helpers/navigation.js'
import { environments } from '#server/common/constants/environments.js'
import { fetchUsage } from '#server/home/helpers/fetch-search.js'

let typeFilters = null

export default async function (request) {
  if (!typeFilters) {
    typeFilters = await fetchTypeFilter()
  }

  let results = []

  request.logger.info(request.query)
  if (request.query?.type) {
    results = await fetchUsage(request.query)
  }

  return {
    pageTitle: 'CDP Dependency Explorer',
    heading: 'Search unique dependencies',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { type: 'npm', ...request.query },
    typeFilters: typeFilters.map((t) => ({ value: t, text: t })),
    results: results.map((r) => [
      { text: r.name },
      { text: r.version },
      { text: r.count }
    ]),
    navigation
  }
}
