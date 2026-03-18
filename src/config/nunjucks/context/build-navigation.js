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
      href: '/deployment',
      text: 'Deployment',
      current: request?.path.startsWith('/deployment')
    },
    {
      href: '/vulnerability',
      text: 'Vulnerability',
      current: request?.path.startsWith('/vulnerability')
    }
  ]
}
