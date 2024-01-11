import { Router } from 'express'
import { MovieController } from '../controller/movies.js'
import { UploadsController } from '../controller/uploads.js'
import { upload } from '../multer.js'

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

  // test uploads file
  moviesRouter.post('/upload', upload.single('file'), UploadsController.uploadFile)

  return moviesRouter
}
