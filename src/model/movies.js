import { connection } from '../config.js'

export class MovieModel {
  static async getGenre () {
    const [genre] = await connection.query(
      'SELECT title, GROUP_CONCAT(genre_name) genres FROM vw_movies_by_genre GROUP BY title'
    )

    return genre.reduce((acc, { title, genres }) => {
      acc[title] = genres.split(',')
      return acc
    }, {})
  }

  static async getGenreIds ({ genreInput }) {
    const [ids] = await connection.query(
      'SELECT id FROM genre WHERE name IN (?);',
      [genreInput]
    )

    return ids.map(({ id }) => id)
  }

  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [moviesByGenre] = await connection.query(
        'SELECT id, title, year, director, poster, rate FROM vw_movies_by_genre WHERE genre_name = ?;',
        [lowerCaseGenre]
      )

      if (moviesByGenre.length === 0) return []

      const genres = await this.getGenre(moviesByGenre)
      const moviesWithGenre = moviesByGenre
        .map(({ id, title, ...movie }) => ({ id, title, ...movie, genre: genres[title] }))

      return moviesWithGenre
    }

    const [result] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, poster, rate FROM movie;'
    )

    const genres = await this.getGenre(result)
    const resultWithGenre = result
      .map(({ id, title, ...movie }) => ({ id, title, ...movie, genre: genres[title] }))

    return resultWithGenre
  }

  static async getById ({ id }) {
    const [result] = await connection.query(
      `SELECT id, title, year, director, poster, rate 
      FROM vw_movies_with_dense_rank m
      WHERE m.dense_rank = ? OR  id = ?
      LIMIT 1`,
      [id, id]
    )

    if (result.length === 0) return null

    const genre = await this.getGenre(result)
    const movieWithGenre = { ...result[0], genre: genre[result[0].title] }

    return movieWithGenre
  }

  static async create ({ input }) {
    // genre is an array
    const {
      genre: genreInput,
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
      'SELECT BIN_TO_UUID(id) id, title, year, director, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )
    const genres = await this.getGenre()
    const movieWithGenre = { ...movie[0], genre: genres[movie[0].title] }

    return movieWithGenre
  }

  // delete movie
  static async delete ({ id }) {
    const [{ affectedRows: deletedCount }] = await connection.query(
      'DELETE FROM movie WHERE id = UUID_TO_BIN(?);', [id]
    )

    return deletedCount > 0
  }

  // update movie
  static async update ({ id, input }) {
    const { genre: genreInput = [], ...rest } = input

    try {
      const [{ affectedRows: updated }] = await connection.query(
        'UPDATE movie SET ? WHERE id = UUID_TO_BIN(?)', [rest, id]
      )

      if (updated > 0 && genreInput.length !== 0) {
        const ids = await this.getGenreIds({ genreInput })
        const values = ids.map(newId => `(UUID_TO_BIN('${id}'), ${newId})`)

        await connection.query(
          'DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?)', [id]
        )

        await connection.query(
        `INSERT INTO movie_genres(movie_id, genre_id) VALUES ${values.join(',')}`
        )
      }

      if (updated > 0) return this.getById({ id })

      return null
    } catch (error) {
      throw new Error('Error updating Movie', { cause: error })
    }
  }
}
