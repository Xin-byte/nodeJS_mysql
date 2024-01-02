import { MovieModel } from '../model/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })

    res.json(movies)
  }

  // get movies by Id
  static async getById (req, res) {
    const { id } = req.params
    const movies = await MovieModel.getById({ id })

    res.json(movies)
  }

  // create new movie
  static async create (req, res) {
    const data = req.body
    const newMovie = await MovieModel.create({ input: data })

    res.status(201).json(newMovie)
  }

  // delete movie
  static async delete (req, res) {
    const { id } = req.params
    const deletedMovie = await MovieModel.delete({ id })

    res.json(deletedMovie)
  }
}
