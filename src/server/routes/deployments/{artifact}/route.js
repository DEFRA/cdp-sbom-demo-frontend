import { fetchTypeFilter } from '#server/services/FilterService.js'
import { environments } from '#server/common/constants/environments.js'
import { getEntity } from '#server/services/EntityService.js'

export default async function (request) {
  const typeFilters = await fetchTypeFilter()

  let results = []

  if (request.query?.service) {
    results = await getEntity(request.query.service)
  }

  return {
    pageTitle: 'CDP Dependency Explorer - Deployment',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { environment: 'prod', ...request.query },
    path: request.path,
    typeFilters: typeFilters.map((t) => ({ value: t, text: t })),
    results: results.map((r) => [
      {
        html: `<a href="/deployment/?type=${request.query.type}&service=${request.query.service}&environment=${request.query.environment}&version=${r.version}">${r.version}</a>`
      },
      {
        html: `<a href="/deployment/dependencies?type=${request.query.type}&service=${request.query.service}&environment=${request.query.environment}&version=${request.query.version}">${r.count}</a>`
      },
      { text: r.version === '10.3.0' ? '3' : '0' }
    ])
  }
}
