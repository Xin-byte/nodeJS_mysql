import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '1234',
  database: 'movies_db'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // const [genres] = await connection.query(
      //   'SELECT * FROM genre WHERE LOWER(name) = ?', [lowerCaseGenre]
      // )

      // if (genres.length === 0) return { error: 'Movies not found' }

      // const [{ id }] = genres

      const [moviesByGenre] = await connection.query(
        'SELECT title, year, director, poster, rate, id FROM vw_movies_by_genre WHERE genre_name = ?;',
        [lowerCaseGenre]
      )

      if (moviesByGenre.length === 0) return { error: 'Movies not found' }

      return moviesByGenre
    }

    const [result] = await connection.query(
      'SELECT title, year, director, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )

    return result
  }
}
