export function buildNavigation(request) {
  return [
    {
      href: '/',
      text: 'Home',
      current: request?.path === '/'
    },
    {
      href: '/dependencies',
      text: 'Dependencies',
      current: request?.path.startsWith('/dependencies')
    },
    {
      href: '/deployments',
      text: 'Deployments',
      current: request?.path.startsWith('/deployments')
    },
    {
      href: '/vulnerabilities',
      text: 'Vulnerabilities',
      current: request?.path.startsWith('/vulnerabilities')
    }
  ]
}
