import Reveal from './Reveal.jsx'

const trainers = [
  { name: 'Ranjit Das', focus: 'Strength & powerlifting', years: '8 yrs coaching', offset: false },
  { name: 'Meera Nayak', focus: 'Conditioning & mobility', years: '5 yrs coaching', offset: true },
  { name: 'Suvendu Behera', focus: 'Hypertrophy programming', years: '6 yrs coaching', offset: false }
]

export default function Trainers() {
  return (
    <section id="trainers" className="section">
      <Reveal>
        <span className="section-label">Coaching staff</span>
        <h2 className="section-title">Every block is coached, not just supervised.</h2>
      </Reveal>
      <div className="trainer-row">
        {trainers.map((t, i) => (
          <Reveal
            key={t.name}
            delay={i * 0.08}
            className={`trainer-card ${t.offset ? 'trainer-card-offset' : ''}`}
          >
            <div className="trainer-initial">{t.name.charAt(0)}</div>
            <h3>{t.name}</h3>
            <p>{t.focus}</p>
            <span className="trainer-years">{t.years}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
