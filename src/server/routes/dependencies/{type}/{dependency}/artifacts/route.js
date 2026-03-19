import { fetchSearch } from '#server/services/SearchService.js'
import { environments } from '#server/common/constants/environments.js'

export default async function (request) {
  const type = request.params.type
  const dependency = request.params.dependency

  const results = await fetchSearch({
    type,
    dependency,
    environment: 'prod',
    ...request.query
  })

  return {
    pageTitle: 'CDP Dependency Explorer - Dependency - Artifacts',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { environment: 'prod', ...request.query },
    path: request.path,
    type,
    dependency,
    results: results.map((r) => [
      {
        html: `<a href="/dependencies/${type}/${dependency}/artifacts?version=${r.depversion}">${r.depversion}</a>`
      },
      {
        html: `<a href="/artifacts/${r.name}?version="><strong>${r.name}</strong></a> (<a href="/artifacts/${r.name}?version=${r.version}">${r.version}</a>)`
      },
      { text: '' }
    ])
  }
}
