export default function Marquee() {
  const words = ['STRENGTH', 'CONDITIONING', 'MOBILITY', 'COMMUNITY', 'DISCIPLINE']
  const loop = [...words, ...words]

  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((w, i) => (
          <span key={i} className="marquee-item">
            {w}
            <span className="marquee-dot">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
