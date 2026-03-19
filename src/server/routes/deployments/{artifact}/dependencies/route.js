import { environments } from '#server/common/constants/environments.js'
import { getEntityDependencies } from '#server/services/EntityService.js'

export default async function (request) {
  const artifact = request.params.artifact

  const results = await getEntityDependencies(
    artifact,
    request.query.version,
    request.query.environment
  )

  return {
    pageTitle: 'CDP Dependency Explorer - Deployments - Dependencies',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { environment: 'prod', ...request.query },
    path: request.path,
    artifact,
    results: results.map((r) => [
      {
        html: `<a href="/deployments/${artifact}/dependencies?environment=${request.query.environment}&version=${r.version}">${r.version}</a>`
      },
      {
        html: `<a href="/dependencies/${r.type}/${encodeURIComponent(r.name)}?environment=${request.query.environment}&version="><strong>${r.name}</strong></a> (<a href="/dependencies/${r.type}/${r.name}?environment=${request.query.environment}&version=${r.depversion}">${r.depversion}</a>)`
      },
      { text: '' }
    ])
  }
}
