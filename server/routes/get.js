/* eslint-disable no-undef */
import { config } from 'dotenv'
import { readFileSync } from 'fs'
import { resolve } from 'path'
config()

const handler = (req, res) => {
  const { title } = req.query

  if (!title) {
    res.status(400).json({
      error: true,
      errorStatus: 400,
      errorMessage:
        'Server: One or more of the required parameters is missing. (password, key or title)'
    })
  }
  const fileName = title
    .replace(/[^\w\s.-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
  const data = readFileSync(
    resolve(process.cwd(), `./blogs/${fileName}.json`),
    {
      encoding: 'utf-8'
    }
  )
  res.status(200).json({
    error: false,
    blog: fileName,
    data: JSON.parse(data)
  })
}

export default {
  name: 'get',
  type: 'get',
  handler
}
