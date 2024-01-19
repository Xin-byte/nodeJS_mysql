import { MovieModel } from '../model/movies.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    // const origin = req.header('origin')

    // if (ACCEPTED_ORIGIN.includes(origin)) {
    //   res.header('Access-Control-Allow-Origin', origin)
    // }

    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })

    if (movies.length === 0) {
      return res.status(404).json({ error: 'Movies not found' })
    }

    return res.json(movies)
  }

  // get movies by Id
  static async getById (req, res) {
    const { id } = req.params
    const movies = await MovieModel.getById({ id })

    if (!movies) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    return res.json(movies)
  }

  // create new movie
  static async create (req, res) {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: result.error.issues })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    return res.status(201).json(newMovie)
  }

  // delete movie
  static async delete (req, res) {
    const { id } = req.params
    const deleted = await MovieModel.delete({ id })

    if (!deleted) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  // update movie
  static async update (req, res) {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(404).json({ success: false, error: result.error.issues })
    }

    const { id } = req.params

    const updated = await MovieModel.update({ id, input: result.data })

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Movie not found' })
    }

    return res.json({ success: true, data: updated })
  }
}
