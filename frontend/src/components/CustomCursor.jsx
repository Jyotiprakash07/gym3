import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const isInteractive = (el) => el.closest('a, button, input, textarea')

    const over = (e) => {
      if (ring.current && isInteractive(e.target)) {
        ring.current.classList.add('cursor-ring-active')
      }
    }
    const out = (e) => {
      if (ring.current && isInteractive(e.target)) {
        ring.current.classList.remove('cursor-ring-active')
      }
    }

    let raf
    const tick = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    tick()

    document.body.classList.add('has-custom-cursor')

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
