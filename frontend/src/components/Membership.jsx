import { useRef } from 'react'
import Reveal from './Reveal.jsx'

const plans = [
  {
    name: 'Drop-in',
    price: '₹350',
    period: '/ session',
    features: ['Any single class', 'Equipment included', 'No commitment']
  },
  {
    name: 'Monthly',
    price: '₹2,400',
    period: '/ month',
    features: ['Unlimited classes', 'Program tracking', 'Priority booking'],
    featured: true
  },
  {
    name: 'Quarterly',
    price: '₹6,300',
    period: '/ 3 months',
    features: ['Unlimited classes', '1 coaching check-in / mo', 'Guest passes ×2']
  }
]

function TiltCard({ children, className }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${y * -8}deg) rotateY(${x * 10}deg) translateZ(6px)`
    el.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`)
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}

export default function Membership() {
  return (
    <section id="membership" className="section">
      <Reveal>
        <span className="section-label">Membership</span>
        <h2 className="section-title">Straightforward pricing, no lock-in contracts.</h2>
      </Reveal>
      <div className="plan-grid">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <TiltCard className={`plan-card ${p.featured ? 'plan-card-featured' : ''}`}>
              <h3>{p.name}</h3>
              <div className="plan-price">
                {p.price}
                <span>{p.period}</span>
              </div>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className="plan-button">Choose {p.name}</button>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
