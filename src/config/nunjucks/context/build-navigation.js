export function buildNavigation(request) {
  return [
    {
      href: '/',
      text: 'Search',
      current: request?.path === '/'
    },
    {
      href: '/usage',
      text: 'Usage',
      current: request?.path === '/usage'
    }
  ]
}
