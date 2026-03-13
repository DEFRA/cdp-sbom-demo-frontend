import { home } from './home/index.js'

export const router = {
  plugin: {
    name: 'router',
    async register(server) {
      // Application specific routes, add your own routes here
      await server.register([home])
    }
  }
}
