import {
  fetchTypeFilter,
  fetchUniqueDependencies
} from './helpers/fetch-filters.js'
import { navigation } from '../common/helpers/navigation.js'
import { environments } from '../common/constants/environments.js'

let typeFilters = null

export const depsController = {
  handler: async (request, h) => {
    if (!typeFilters) {
      typeFilters = await fetchTypeFilter()
    }

    let results = []

    request.logger.info(request.query)
    if (request.query?.type) {
      results = await fetchUniqueDependencies(request.query)
    }

    console.log(results)
    return h.view('home/deps', {
      pageTitle: 'CDP Dependency Explorer',
      heading: 'Search unique dependencies',
      environments: environments.map((e) => ({ value: e, text: e })),
      query: { type: 'npm', ...request.query },
      typeFilters: typeFilters.map((t) => ({ value: t, text: t })),
      results: results.map((r) => [
        {
          html: `<a href='/usage?type=${request.query.type}&partialName=${r.name}&environment=${request.query.environment}'>${r.name}</a>`
        }
      ]),
      navigation
    })
  }
}
