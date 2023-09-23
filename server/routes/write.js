/* eslint-disable no-undef */
import { config } from 'dotenv'
import { writeFile } from 'fs'
import { resolve } from 'path'
config()

const dateC = new Date()

const months = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık'
]

const handler = (req, res) => {
  const { password, key, title, description, context } = req.query

  if (!password || !key || !title || !description || !context) {
    res.status(400).json({
      error: true,
      errorStatus: 400,
      errorMessage:
        "Server: One or more of the required parameters is missing. (password, key, title, description or context)"
    })
  }

  if (
    process.env.READ === 'true' &&
    password.toString() === process.env.PASSWORD.toString() &&
    key === process.env.KEY.toString()
  ) {
    const fileName = title
      .replace(/[^\w\s.-]/g, '')
      .replace(/\s+/g, '-')
    writeFile(
      resolve(process.cwd(), `./blogs/${fileName}.json`),
      JSON.stringify({
        title,
        description,
        context,
        date: `${dateC.getDate()} ${
          months[dateC.getMonth()]
        } ${dateC.getFullYear()}`
      }),
      {
        encoding: 'utf-8'
      },
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
      blog: fileName
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
  name: 'write',
  type: 'post',
  handler
}
