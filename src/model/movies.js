import { connection } from '../config.js'

export class MovieModel {
  static async getGenre () {
    const [genre] = await connection.query(
      'SELECT genre_name name, title FROM vw_movies_by_genre'
    )

    return genre.reduce((acc, { name, title }) => {
      acc[title] ??= []
      acc[title].push(name)

      return acc
    }
    , {})
  }

  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [moviesByGenre] = await connection.query(
        'SELECT title, year, director, poster, rate, id FROM vw_movies_by_genre WHERE genre_name = ?;',
        [lowerCaseGenre]
      )

      if (moviesByGenre.length === 0) return { error: 'Movies not found' }
      const genres = await this.getGenre(moviesByGenre)
      const moviesWithGenre = moviesByGenre.map(movie => ({ ...movie, genre: genres[movie.title] }))

      return moviesWithGenre
    }

    const [result] = await connection.query(
      'SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )

    const genres = await this.getGenre(result)
    const resultWithGenre = result.map(movie => ({ ...movie, genre: genres[movie.title] }))

    return resultWithGenre
  }

  static async getById ({ id }) {
    const [result] = await connection.query(
      `SELECT title, year, director, poster, rate, id 
      FROM vw_movies_with_dense_rank m
      WHERE m.dense_rank = ?
      LIMIT 1`,
      [id]
    )

    if (result.length === 0) return { error: 'Movie not found' }

    return result
  }

  static async getGenreIds ({ genreInput }) {
    const [ids] = await connection.query(
      'SELECT id FROM genre WHERE name IN (?);',
      [genreInput]
    )

    return ids.map(({ id }) => id)
  }

  static async create ({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    const uuid = crypto.randomUUID()

    const genreIds = await this.getGenreIds({ genreInput })
    const movieIdBinary = `UUID_TO_BIN('${uuid}')`
    const values = genreIds.map(id => `(${movieIdBinary}, ${id})`)

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
         VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (error) {
      throw new Error('Error creating movie', { cause: error })
    }

    try {
      await connection.query(
        `INSERT INTO movie_genres (movie_id, genre_id) VALUES ${values.join(',')};`
      )
    } catch (error) {
      throw new Error('Error creating movie', { cause: error })
    }

    const [movie] = await connection.query(
      'SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )

    return movie[0]
  }
}
