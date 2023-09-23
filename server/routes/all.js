/* eslint-disable no-undef */
import { config } from 'dotenv'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
config()

const handler = (req, res) => {
  const files = readdirSync(resolve(process.cwd(), './blogs'))
  const datas = []
  files.forEach(file => {
    const data = readFileSync(
      resolve(process.cwd(), `./blogs/${file}`),
      { encoding: 'utf-8' }
    )
    datas.push(JSON.parse(data))
  })

  res.status(200).json({
    error: false,
    datas
  })
}

export default {
  name: 'all',
  type: 'get',
  handler
}
