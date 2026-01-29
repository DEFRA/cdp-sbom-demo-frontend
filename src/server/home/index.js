import { searchController } from './controllers/search-controller.js'
import { depsController } from './controllers/deps-controller.js'
import { usageController } from './controllers/usage-controller.js'

/**
 * Sets up the routes used in the home page.
 * These routes are registered in src/server/router.js.
 */
export const home = {
  plugin: {
    name: 'home',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/',
          ...searchController
        },
        {
          method: 'GET',
          path: '/deps',
          ...depsController
        },
        {
          method: 'GET',
          path: '/usage',
          ...usageController
        }
      ])
    }
  }
}
