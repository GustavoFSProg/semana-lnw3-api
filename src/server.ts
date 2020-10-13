import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// import './database/connection'
import { createConnection } from 'typeorm'

createConnection()

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  return res.send({ message: 'entrou' })
})
const { PORT } = process.env

app.listen(PORT, console.log(`API - Server on PORT: ${PORT}`))

export default app
