import { fetchTypeFilter } from '#server/services/FilterService.js'

const environments = [
  '',
  'latest',
  'dev',
  'test',
  'perf-test',
  'ext-test',
  'prod'
]

export default async function (request) {
  const typeFilters = await fetchTypeFilter()

  return {
    pageTitle: 'CDP Dependency Explorer - Dependency - Vulnerabilities',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { type: 'npm', environment: 'latest', ...request.query },
    path: request.path,
    typeFilters: typeFilters.map((t) => ({ value: t, text: t }))
  }
}
