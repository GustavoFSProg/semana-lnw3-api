import express from 'express'
import cors from 'cors'
import routes from './routes.ts'
import dotenv from 'dotenv'
// import './database/connection'
import { createConnection } from 'typeorm'
import 'reflect-metadata'

createConnection()

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', routes)

const { PORT } = process.env

app.listen(PORT, console.log(`API - Server on PORT: ${PORT}`))

export default app
