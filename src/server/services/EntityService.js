import { config } from '#config/config.js'

export async function getEntity(name) {
  const baseUrl = config.get('cdpSbomExplorerUrl')
  const entityUrl = new URL(`/entities/${name}`, baseUrl)

  const resp = await fetch(entityUrl, { method: 'GET' })
  if (resp.status === 200) {
    return resp.json()
  }

  return []
}
