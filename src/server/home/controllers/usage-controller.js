import { fetchTypeFilter } from '../helpers/fetch-filters.js'
import { navigation } from '../../common/helpers/navigation.js'
import { environments } from '../../common/constants/environments.js'
import { fetchUsage } from '../helpers/fetch-search.js'

let typeFilters = null

export const usageController = {
  handler: async (request, h) => {
    if (!typeFilters) {
      typeFilters = await fetchTypeFilter()
    }

    let results = []

    request.logger.info(request.query)
    if (request.query?.type) {
      results = await fetchUsage(request.query)
    }

    console.log(results)
    return h.view('home/views/usage', {
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
    })
  }
}
