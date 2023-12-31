import { Router } from 'express'
import { MovieController } from '../controller/movies.js'

export const movieRouter = () => {
  const moviesRouter = Router()

  moviesRouter.get('/', MovieController.getAll)

  return moviesRouter
}
