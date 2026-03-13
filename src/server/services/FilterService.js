import { config } from '#config/config.js'

export async function fetchTypeFilter() {
  const baseUrl = config.get('cdpSbomExplorerUrl')
  const searchUrl = new URL('/filters/dependency-type', baseUrl)

  const resp = await fetch(searchUrl, { method: 'GET' })
  if (resp.status === 200) {
    return resp.json()
  }

  return []
}

export async function fetchUniqueDependencies(query) {
  const baseUrl = config.get('cdpSbomExplorerUrl')
  const searchUrl = new URL('/filters/dependencies', baseUrl)

  if (query.type) {
    searchUrl.searchParams.set('type', query.type)
  }

  if (query.partialName) {
    searchUrl.searchParams.set('partialName', query.partialName + '%')
  }

  if (query.environment) {
    searchUrl.searchParams.set('environment', query.environment)
  }

  const resp = await fetch(searchUrl, { method: 'GET' })
  if (resp.status === 200) {
    return resp.json()
  }

  return []
}
