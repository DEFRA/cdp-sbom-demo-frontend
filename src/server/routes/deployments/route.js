import { environments } from '#server/common/constants/environments.js'

export default async function (request) {
  return {
    pageTitle: 'CDP Dependency Explorer - Deployments',
    environments: environments.map((e) => ({ value: e, text: e })),
    query: { environment: 'prod', ...request.query }
  }
}

export async function POST(request, h) {
  const artifact = request.payload.artifact

  // const redirectUrl = request.routeLookup('dependencies', {
  //   params: { dependency }
  // })
  return h.redirect(`/deployments/${artifact}`)
}
