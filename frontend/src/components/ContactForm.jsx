import { useState } from 'react'
import Reveal from './Reveal.jsx'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setForm({ name: '', phone: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section">
      <Reveal>
        <span className="section-label">Visit the floor</span>
        <h2 className="section-title">Book a free trial class.</h2>
      </Reveal>
      <Reveal delay={0.1} className="contact-wrap">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </label>
          <label>
            Phone
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="10-digit number"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Which program are you interested in?"
            />
          </label>
          <button type="submit" className="contact-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Request trial class'}
          </button>
          {status === 'sent' && <p className="form-status form-status-ok">Request received — we'll call you shortly.</p>}
          {status === 'error' && <p className="form-status form-status-err">Something went wrong. Try again.</p>}
        </form>
        <div className="contact-info">
          <div>
            <h4>Address</h4>
            <p>Main Road, Soro, Balasore District, Odisha</p>
          </div>
          <div>
            <h4>Hours</h4>
            <p>Mon–Sat · 6:00 AM – 9:00 PM</p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>+91 00000 00000</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
