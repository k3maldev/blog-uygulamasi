import express from 'express'
import RouteHandler from './routeHandler.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'

const app = express()

app.use(cors())
app.use(compression())
app.use(bodyParser())

const handler = new RouteHandler('routes')
handler.getFiles()
handler.handle(app)

app.listen(3030)
