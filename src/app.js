import express, { json, static as st } from 'express'
import { ipAddress } from './helpers/getIpAddress.js'
import { movieRouter } from './routes/movies.js'
import { corsMiddlewares } from './middlewares/cors.js'
import 'dotenv/config'
// init
const app = express()
app.disable('x-powered-by')
// middlewares
app.use(json())
app.use(corsMiddlewares())
// config
const PORT = process.env.PORT
const HOST = process.env.HOST ?? ipAddress

// static files
app.use(st('./src/uploads'))

// routes
app.use('/movies', movieRouter())

// listen server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server start on http://${HOST}:${PORT}/movies`)
})
