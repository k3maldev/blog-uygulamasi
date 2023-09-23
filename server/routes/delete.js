/* eslint-disable no-undef */
import { config } from 'dotenv'
import { unlink } from 'fs'
import { resolve } from 'path'
config()

const handler = (req, res) => {
  const { password, key, title } = req.query

  if (!password || !key || !title) {
    res.status(400).json({
      error: true,
      errorStatus: 400,
      errorMessage:
        "Server: One or more of the required parameters is missing. (password, key or title)"
    })
  }

  if (
    process.env.READ &&
    password.toString() === process.env.PASSWORD.toString() &&
    key === process.env.KEY.toString()
  ) {
    const fileName = title
      .replace(/[^\w\s.-]/g, '')
      .replace(/\s+/g, '-')
    unlink(
      resolve(process.cwd(), `./blogs/${fileName}.json`),
      err => {
        if (err) {
          res.status(500).json({
            error: true,
            errorStatus: 500,
            errorMessage:
              `Server: ${err.message}`
          })
        }
      }
    )
    res.status(200).json({
      error: false,
      deletedBlog: fileName
    })
  } else {
    res.status(401).json({
      error: true,
      errorStatus: 401,
      errorMessage:
        `Server: 'password' or 'key' is incorrect. Unauthorized entry.`
    })
  }
}

export default {
  name: 'delete',
  type: 'delete',
  handler
}
