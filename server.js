import express from 'express'
import env from 'dotenv'
import authRoutes from './routes/authRoutes.js'

env.config()

const app = express()
app.use(express.json())
app.use('/api', authRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log('Rodando na porta ' + PORT))