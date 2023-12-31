import mysql from 'mysql2/promise'

const configDataBase = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'movies_db'
}

export const connection = await mysql.createConnection(configDataBase)
