import express from 'express'
import cors from 'cors'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/contact', contactRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'forge-gym-backend' })
})

app.listen(PORT, () => {
  console.log(`Forge gym backend running on http://localhost:${PORT}`)
})
