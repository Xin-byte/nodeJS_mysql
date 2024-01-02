import { MovieModel } from '../model/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })

    if (movies.length === 0) res.status(404).json({ error: 'Movies not found' })

    res.json(movies)
  }

  // get movies by Id
  static async getById (req, res) {
    const { id } = req.params
    const movies = await MovieModel.getById({ id })

    if (!movies) res.status(404).json({ error: 'Movie not found' })

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
    const deleted = await MovieModel.delete({ id })

    if (deleted === false) return res.status(404).json({ message: 'Movie not found' })

    return res.json({ message: 'Movie deleted' })
  }

  // update movie
  static async update (req, res) {
    const { id } = req.params
    const input = req.body

    try {
      const updated = await MovieModel.update({ id, input })

      if (!updated) return res.status(404).json({ success: false, message: 'Movie not found' })

      return res.json({ success: true, data: updated })
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Sever Error' })
    }
  }
}
