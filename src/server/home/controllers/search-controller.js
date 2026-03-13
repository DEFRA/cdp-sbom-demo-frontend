/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 */
import { fetchSearch } from '../helpers/fetch-search.js'
import { fetchTypeFilter } from '../helpers/fetch-filters.js'
import { navigation } from '../../common/helpers/navigation.js'

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

export const searchController = {
  handler: async (request, h) => {
    if (!typeFilters) {
      typeFilters = await fetchTypeFilter()
    }

    let results = []

    request.logger.info(request.query)
    if (request.query?.type && request.query?.name) {
      results = await fetchSearch(request.query)
    }

    return h.view('home/views/index', {
      pageTitle: 'CDP Dependency Explorer',
      heading: 'Dependency Explorer (demo)',
      environments: environments.map((e) => ({ value: e, text: e })),
      query: { type: 'npm', ...request.query },
      typeFilters: typeFilters.map((t) => ({ value: t, text: t })),
      results: results.map((r) => [
        { text: r.depversion },
        { html: `<strong>${r.name}</strong>  (${r.version})` }
      ]),
      navigation
    })
  }
}
