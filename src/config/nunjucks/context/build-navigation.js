export function buildNavigation(request) {
  return [
    {
      href: '/',
      text: 'Home',
      current: request?.path === '/'
    },
    {
      href: '/artifacts',
      text: 'Artifacts',
      current: request?.path.startsWith('/artifacts')
    },
    {
      href: '/dependencies',
      text: 'Dependencies',
      current: request?.path.startsWith('/dependencies')
    },
    {
      href: '/vulnerabilities',
      text: 'Vulnerabilities',
      current: request?.path.startsWith('/vulnerabilities')
    }
  ]
}
