import express, { json } from 'express'
import { movieRouter } from './routes/movies.js'
// init
const app = express()
// middlewares
app.use(json())
// config
const PORT = process.env.PORT ?? 5000
const HOST = process.env.HOST ?? '192.168.1.109'

// routes
app.use('/movies', movieRouter())

// listen server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server start on http://${HOST}:${PORT}/movies`)
})
