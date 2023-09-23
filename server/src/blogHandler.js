import { resolve } from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

class BlogHandler {
  constructor(directory) {
    this.directory = directory
      ? // eslint-disable-next-line no-undef
        resolve(process.cwd(), directory)
      : // eslint-disable-next-line no-undef
        resolve(process.cwd(), 'blogs')
  }

  async handle(blog) {
    const handler = await require(`${this.directory}\\${blog}.json`, {
      assert: {
        type: 'json'
      }
    })
    console.log(handler)
    const context = handler.context
    const title = handler.title
    const description = handler.description

    this.data = {
      title,
      description,
      context
    }
  }
}

export default BlogHandler
