import { Router } from 'express'

const router = Router()

// In-memory store — swap for a real database (e.g. MongoDB, Postgres) in production.
const submissions = []

router.post('/', (req, res) => {
  const { name, phone, message } = req.body || {}

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' })
  }

  const phoneDigits = String(phone).replace(/\D/g, '')
  if (phoneDigits.length < 10) {
    return res.status(400).json({ error: 'Enter a valid phone number.' })
  }

  const entry = {
    id: submissions.length + 1,
    name: String(name).trim(),
    phone: phoneDigits,
    message: message ? String(message).trim() : '',
    receivedAt: new Date().toISOString()
  }

  submissions.push(entry)
  console.log('New trial-class request:', entry)

  res.status(201).json({ ok: true, id: entry.id })
})

// Simple listing endpoint for the gym owner to check requests (no auth — add before deploying).
router.get('/', (_req, res) => {
  res.json(submissions)
})

export default router
