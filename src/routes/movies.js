import { Router } from 'express'
import { MovieController } from '../controller/movies.js'

export const movieRouter = () => {
  const moviesRouter = Router()

  // get all movie or by genre
  moviesRouter.get('/', MovieController.getAll)

  // get movie by id
  moviesRouter.get('/:id', MovieController.getById)

  // create new movie
  moviesRouter.post('/', MovieController.create)

  // delete movie
  moviesRouter.delete('/:id', MovieController.delete)

  // update movie
  moviesRouter.patch('/:id', MovieController.update)

  return moviesRouter
}
