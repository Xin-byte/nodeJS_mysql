import { connection } from '../config.js'
import { uuidToBin } from '../helpers/index.js'

export class UploadsModel {
  static async upload ({ fileName, path }) {
    const uuid = crypto.randomUUID()

    try {
      connection.beginTransaction()

      await connection.query(
        'INSERT INTO uploads (id, fileName, path) VALUES (?, ?, ?);',
        [uuidToBin(uuid), fileName, path]
      )

      const [file] = await connection.query(
        'SELECT fileName, path FROM uploads WHERE id = UUID_TO_BIN(?)',
        [uuid]
      )

      connection.commit()

      return file[0]
    } catch (error) {
      connection.rollback()
      console.error(error)
    }
  }
}
