export function buildNavigation(request) {
  return [
    {
      href: '/',
      text: 'Home',
      current: request?.path === '/'
    },
    {
      href: '/dependency',
      text: 'Dependency',
      current: request?.path.startsWith('/dependency')
    },
    {
      href: '/service',
      text: 'Service',
      current: request?.path.startsWith('/service')
    },
    {
      href: '/vulnerability',
      text: 'Vulnerability',
      current: request?.path.startsWith('/vulnerability')
    }
  ]
}
