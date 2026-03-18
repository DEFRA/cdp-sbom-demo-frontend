import { environments } from '#server/common/constants/environments.js'

export default async function (request) {
  const type = request.params.type
  const dependency = request.params.dependency

  return {
    pageTitle: 'CDP Dependency Explorer - Dependency - Vulnerabilities',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { environment: 'prod', ...request.query },
    path: request.path,
    type,
    dependency
  }
}
