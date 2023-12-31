import { MovieModel } from '../model/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })

    res.json(movies)
  }
}
