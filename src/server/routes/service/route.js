import { fetchTypeFilter } from '#server/services/FilterService.js'
import { environments } from '#server/common/constants/environments.js'

export default async function (request) {
  const typeFilters = await fetchTypeFilter()

  let results = []

  if (request.query?.service) {
    // results = await fetchUsage(request.query)
  }

  return {
    pageTitle: 'CDP Dependency Explorer - Service',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { environment: 'latest', ...request.query },
    path: request.path,
    typeFilters: typeFilters.map((t) => ({ value: t, text: t })),
    results: results.map((r) => [
      {
        html: `<a href="/dependency/?type=${request.query.type}&dependency=${request.query.dependency}&environment=${request.query.environment}&version=${r.version}">${r.version}</a>`
      },
      {
        html: `<a href="/dependency/services?type=${request.query.type}&dependency=${request.query.dependency}&environment=${request.query.environment}&version=${request.query.version}">${r.count}</a>`
      },
      { text: r.version === '9.6.0' ? '3' : '0' }
    ])
  }
}
