import { config } from '../../../config/config.js'

export async function fetchSearch(query) {
  const baseUrl = config.get('cdpSbomExplorerUrl')
  const searchUrl = new URL('/search', baseUrl)

  if (query.type) {
    searchUrl.searchParams.set('type', query.type)
  }

  if (query.name) {
    searchUrl.searchParams.set('name', query.name)
  }

  if (query.environment) {
    searchUrl.searchParams.set('environment', query.environment)
  }

  if (query.version) {
    const tokens = query.version.split(/\s+/).filter(Boolean)

    for (const t of tokens) {
      if (t.startsWith('>')) {
        searchUrl.searchParams.set('gte', t.slice(1))
      }
      if (t.startsWith('<')) {
        console.log(t, t.slice(1))
        searchUrl.searchParams.set('lte', t.slice(1))
      }
      if (t.startsWith('=')) {
        searchUrl.searchParams.set('version', t.slice(1))
      }
      if (t[0] >= '0' && t[0] <= '9') {
        searchUrl.searchParams.set('version', t)
      }
    }
  }

  const resp = await fetch(searchUrl, { method: 'GET' })
  if (resp.status === 200) {
    return resp.json()
  }

  throw Error(`Unable to fetch running services for ${searchUrl}`)
}

export async function fetchUsage(query) {
  const baseUrl = config.get('cdpSbomExplorerUrl')
  const searchUrl = new URL('/usage', baseUrl)

  if (query.type) {
    searchUrl.searchParams.set('type', query.type)
  }

  if (query.partialName) {
    searchUrl.searchParams.set('partialName', query.partialName)
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
