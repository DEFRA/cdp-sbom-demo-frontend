import { fetchTypeFilter } from '#server/services/FilterService.js'

export default async function (request) {
  const typeFilters = await fetchTypeFilter()

  return {
    pageTitle: 'CDP Dependency Explorer - Dependencies',
    query: request.query,
    typeFilters: typeFilters.map((t) => ({ value: t, text: t }))
  }
}

export async function POST(request, h) {
  const dependency = request.payload.dependency
  const type = request.payload.type

  // const redirectUrl = request.routeLookup('dependencies', {
  //   params: { dependency }
  // })
  return h.redirect(`/dependencies/${type}/${dependency}`)
}
