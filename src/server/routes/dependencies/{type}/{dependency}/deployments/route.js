import { fetchSearch } from '#server/services/SearchService.js'
import { environments } from '#server/common/constants/environments.js'

export default async function (request) {
  const type = request.params.type
  const dependency = request.params.dependency

  let results = []

  if (request.query?.type && request.query?.dependency) {
    results = await fetchSearch(request.query)
  }

  return {
    pageTitle: 'CDP Dependency Explorer - Dependency - Deployments',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { environment: 'prod', ...request.query },
    path: request.path,
    type,
    dependency,
    results: results.map((r) => [
      {
        html: `<a href="/dependency/deployments?type=${request.query.type}&dependency=${request.query.dependency}&environment=${request.query.environment}&version=${r.depversion}">${r.depversion}</a>`
      },
      {
        html: `<a href="/service/?deployments=${r.name}&environment=${request.query.environment}&version="><strong>${r.name}</strong></a> (<a href="/service/?service=${r.name}&environment=${request.query.environment}&version=${r.version}">${r.version}</a>)`
      },
      { text: '' }
    ])
  }
}
