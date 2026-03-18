import { fetchTypeFilter } from '#server/services/FilterService.js'
import { environments } from '#server/common/constants/environments.js'
import { fetchUsage } from '#server/services/SearchService.js'

export default async function (request) {
  const typeFilters = await fetchTypeFilter()

  let results = []

  if (request.query?.type && request.query?.dependency) {
    results = await fetchUsage(request.query)
  }

  return {
    pageTitle: 'CDP Dependency Explorer - Dependency',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { type: 'npm', environment: 'prod', ...request.query },
    path: request.path,
    typeFilters: typeFilters.map((t) => ({ value: t, text: t })),
    results: results.map((r) => [
      {
        html: `<a href="/dependency/?type=${request.query.type}&dependency=${request.query.dependency}&environment=${request.query.environment}&version=${r.version}">${r.version}</a>`
      },
      {
        html: `<a href="/dependency/services?type=${request.query.type}&dependency=${request.query.dependency}&environment=${request.query.environment}&version=${r.version}">${r.count}</a>`
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
