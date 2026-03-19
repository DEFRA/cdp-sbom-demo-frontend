import { environments } from '#server/common/constants/environments.js'
import { getEntity } from '#server/services/EntityService.js'

export default async function (request) {
  const artifact = request.params.artifact

  const results = await getEntity(
    artifact,
    request.query.version,
    request.query.environment
  )

  return {
    pageTitle: 'CDP Dependency Explorer - Deployments',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { environment: 'prod', ...request.query },
    path: request.path,
    artifact,
    results: results.map((r) => [
      {
        html: `<a href="/artifacts/${artifact}?version=${r.version}">${r.version}</a>`
      },
      {
        html: `<a href="/artifacts/${artifact}/dependencies?version=${r.version}">${r.count}</a>`
      },
      { text: '' }
    ])
  }
}
