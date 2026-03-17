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
      current: request?.path === '/dependency'
    },
    {
      href: '/service',
      text: 'Service',
      current: request?.path === '/service'
    },
    {
      href: '/vulnerability',
      text: 'Vulnerability',
      current: request?.path === '/vulnerability'
    }
  ]
}
