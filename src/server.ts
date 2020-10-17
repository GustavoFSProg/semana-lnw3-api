import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes.ts'
import dotenv from 'dotenv'
// import './database/connection'
import { createConnection } from 'typeorm'
import 'reflect-metadata'
import path from 'path'
import errorhandler from './errors/handler'

createConnection()

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(errorhandler)

app.use(
  '/uploads',
  express.static(path.resolve('https://happy-nlw3-app.herokuapp.com/uploads'))
)

// app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
const { PORT } = process.env

app.listen(PORT, console.log(`API - Server on PORT: ${PORT}`))

export default app
