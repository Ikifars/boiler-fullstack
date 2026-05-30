import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env'
import authRoutes from './routes/auth.routes'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.use(helmet())
app.use(cors({ origin: env.CLIENT_URL }))
app.use(express.json())

app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.use('/auth', authRoutes)

app.use(errorHandler)

export default app