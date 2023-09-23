import { readdirSync } from 'fs'
import { resolve } from 'path'

class RouteHandler {
  constructor(directory) {
    this.directory = directory
      ? // eslint-disable-next-line no-undef
        resolve(process.cwd(), directory)
      : // eslint-disable-next-line no-undef
        resolve(process.cwd(), 'routes')
    this.files = []
  }

  getFiles() {
    try {
      readdirSync(this.directory).forEach(file => {
        this.files.push(file)
      })
    } catch (_) {
      throw new Error(_)
    }
  }

  handle(app) {
    this.files.forEach(async filePath => {
      const handlerWithoutDefault = await import(
        `file://${this.directory}/${filePath}`
      )
      const handler = handlerWithoutDefault.default
      const type = handler.type.toLowerCase()
      switch (type) {
        case 'get':
          app.get('/' + handler.name, async (req, res) => {
            handler.handler(req, res)
          })
          break
        case 'post':
          app.post('/' + handler.name, async (req, res) => {
            handler.handler(req, res)
          })
          break
        case 'put':
          app.put('/' + handler.name, async (req, res) => {
            handler.handler(req, res)
          })
          break
        case 'delete':
          app.delete('/' + handler.name, async (req, res) => {
            handler.handler(req, res)
          })

          break
        default:
          throw TypeError('server: unexpected request type')
      }
    })
  }
}

export default RouteHandler
