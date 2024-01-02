import express, { json } from 'express'
import { movieRouter } from './routes/movies.js'
import 'dotenv/config'
// init
const app = express()
// middlewares
app.use(json())
// config
const PORT = process.env.PORT
const HOST = process.env.HOST

// routes
app.use('/movies', movieRouter())

// listen server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server start on http://${HOST}:${PORT}/movies`)
})
