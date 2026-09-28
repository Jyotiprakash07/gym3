import { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(SplitText, useGSAP)

export default function AnimatedHeadline({ lines, className = '' }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const lineEls = gsap.utils.toArray('.hl-line', root.current)
        const splits = []
        const cleanups = []
        let accentChars = []

        const intro = gsap.timeline({ delay: 0.25 })

        lineEls.forEach((el, i) => {
          const split = SplitText.create(el, { type: 'words,chars', charsClass: 'char', wordsClass: 'word' })
          splits.push(split)
          if (i === lineEls.length - 1) accentChars = split.chars

          // 3D flip-up entrance, line by line
          intro.from(
            split.chars,
            {
              yPercent: 130,
              rotationX: -95,
              opacity: 0,
              transformOrigin: '50% 100% -30px',
              duration: 1.1,
              ease: 'power4.out',
              stagger: { each: 0.04, from: 'start' }
            },
            i * 0.28
          )

          // hover: letters pop up as the pointer passes over them
          split.chars.forEach((ch) => {
            const pop = () =>
              gsap.to(ch, {
                y: -18,
                rotation: gsap.utils.random(-6, 6),
                duration: 0.22,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1,
                overwrite: 'auto'
              })
            ch.addEventListener('pointerenter', pop)
            cleanups.push(() => ch.removeEventListener('pointerenter', pop))
          })
        })

        // after the intro, a highlight wave sweeps the accent line on a loop
        if (accentChars.length) {
          intro.add(
            gsap.to(accentChars, {
              color: '#f7e29a',
              duration: 0.4,
              ease: 'sine.inOut',
              stagger: 0.08,
              yoyo: true,
              repeat: -1,
              repeatDelay: 2.8
            }),
            '+=0.4'
          )
        }

        return () => {
          cleanups.forEach((fn) => fn())
          splits.forEach((s) => s.revert())
        }
      })

      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <h1 ref={root} className={className}>
      {lines.map((text, i) => (
        <span
          key={text}
          className={`hl-line ${i === lines.length - 1 ? 'hl-accent' : ''}`}
        >
          {text}
        </span>
      ))}
    </h1>
  )
}
