import { environments } from '#server/common/constants/environments.js'
import { fetchUsage } from '#server/services/SearchService.js'

export default async function (request) {
  const type = request.params.type
  const dependency = request.params.dependency

  const results = await fetchUsage({
    type,
    dependency,
    environment: 'prod',
    ...request.query
  })

  return {
    pageTitle: 'CDP Dependency Explorer - Dependency',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { environment: 'prod', ...request.query },
    type,
    dependency,
    path: request.path,
    results: results.map((r) => [
      {
        html: `<a href="/dependencies/${type}/${dependency}?version=${r.version}">${r.version}</a>`
      },
      {
        html: `<a href="/dependencies/${type}/${dependency}/artifacts?version=${r.version}">${r.count}</a>`
      },
      {
        html:
          r.version === '10.3.0'
            ? '<strong class="govuk-tag govuk-tag--red">Severe (3)</strong> <strong class="govuk-tag govuk-tag--yellow">Medium (2)</strong>'
            : ''
      }
    ])
  }
}
