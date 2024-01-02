import mysql from 'mysql2/promise'
import 'dotenv/config'

const configDataBase = {
  host: 'localhost',
  port: 3306,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}

export const connection = await mysql.createConnection(configDataBase)
