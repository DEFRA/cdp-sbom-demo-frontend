export function buildNavigation(request) {
  return [
    {
      href: '/',
      text: 'Search',
      current: request?.path === '/'
    },
    {
      href: '/deps',
      text: 'Dependency Lookup',
      current: request?.path === '/deps'
    },
    {
      href: '/usage',
      text: 'Usage',
      current: request?.path === '/usage'
    }
  ]
}
