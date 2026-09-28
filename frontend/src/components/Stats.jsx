import Reveal from './Reveal.jsx'

const stats = [
  { value: '412', label: 'Members training weekly', big: true },
  { value: '9', label: 'Coaches on the floor' },
  { value: '6:00', label: 'Earliest class, daily' },
  { value: '11', label: 'Years open in Soro' }
]

export default function Stats() {
  return (
    <section className="stats-band">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06} className={`stat ${s.big ? 'stat-big' : ''}`}>
          <div className="stat-value">{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </Reveal>
      ))}
    </section>
  )
}
