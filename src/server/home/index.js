import { homeController } from './controller.js'
import { depsController } from './deps-controller.js'
import { usageController } from './usage-controller.js'

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
          ...homeController
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
