import { config } from '#config/config.js'

export async function getEntity(name, version, environment) {
  const baseUrl = config.get('cdpSbomExplorerUrl')
  const entityUrl = new URL(`/entities/${name}`, baseUrl)

  if (version) {
    entityUrl.searchParams.set('version', version)
  }

  if (environment) {
    entityUrl.searchParams.set('environment', environment)
  }

  const resp = await fetch(entityUrl, { method: 'GET' })
  if (resp.status === 200) {
    return resp.json()
  }

  return []
}

export async function getEntityDependencies(name, version, environment) {
  const baseUrl = config.get('cdpSbomExplorerUrl')
  const entityUrl = new URL(`/entities/${name}/dependencies`, baseUrl)

  if (version) {
    entityUrl.searchParams.set('version', version)
  }

  if (environment) {
    entityUrl.searchParams.set('environment', environment)
  }

  const resp = await fetch(entityUrl, { method: 'GET' })
  if (resp.status === 200) {
    return resp.json()
  }

  return []
}
