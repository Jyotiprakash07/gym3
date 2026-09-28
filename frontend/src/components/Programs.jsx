import { useRef, useState, useEffect } from 'react'
import Reveal from './Reveal.jsx'

const programs = [
  {
    name: 'Strength Base',
    desc: 'Barbell fundamentals — squat, press, pull. Built for lifters starting from zero.',
    duration: '45 min',
    tag: '01'
  },
  {
    name: 'Conditioning Floor',
    desc: 'Mixed-modal circuits pairing kettlebell, sled, and rower work against the clock.',
    duration: '35 min',
    tag: '02'
  },
  {
    name: 'Hypertrophy Split',
    desc: 'Body-part focused programming for lifters training toward visible, measured growth.',
    duration: '60 min',
    tag: '03'
  },
  {
    name: 'Mobility & Recovery',
    desc: 'Loaded stretching and joint work to keep the rest of your training on schedule.',
    duration: '30 min',
    tag: '04'
  }
]

export default function Programs() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const cards = Array.from(el.children)
      const center = el.scrollLeft + el.clientWidth / 2
      let closest = 0
      let min = Infinity
      cards.forEach((c, i) => {
        const dist = Math.abs(c.offsetLeft + c.clientWidth / 2 - center)
        if (dist < min) {
          min = dist
          closest = i
        }
      })
      setActive(closest)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (i) => {
    const el = trackRef.current
    if (!el) return
    const card = el.children[i]
    el.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
  }

  return (
    <section id="programs" className="section section-bleed">
      <div className="section-inner">
        <Reveal>
          <span className="section-label">Programs</span>
          <h2 className="section-title">Four ways to train, one floor to do it on.</h2>
        </Reveal>
      </div>

      <div className="program-track" ref={trackRef}>
        {programs.map((p, i) => (
          <div key={p.name} className={`program-card ${active === i ? 'is-active' : ''}`}>
            <div className="program-tag">{p.tag}</div>
            <div className="program-duration">{p.duration}</div>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="program-dots">
        {programs.map((p, i) => (
          <button
            key={p.name}
            className={`program-dot ${active === i ? 'is-active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Show ${p.name}`}
          />
        ))}
      </div>
    </section>
  )
}
