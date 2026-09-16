import { useEffect, useRef } from 'react'

const LINES = ['KENE', 'JOHN']
const LIME = '#c8f542'
const MAGENTA = '#ff4fd8'
const CREAM = '#f2f0ea'

export default function KineticName() {
  const wrapRef = useRef(null)
  const charsRef = useRef([])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const mouse = { x: 0.5, y: 0.5, inside: false }
    let raf

    const onMove = (event) => {
      const box = wrap.getBoundingClientRect()
      mouse.x = (event.clientX - box.left) / box.width
      mouse.y = (event.clientY - box.top) / box.height
      mouse.inside = true
    }

    const onLeave = () => {
      mouse.inside = false
    }

    const tick = (now) => {
      charsRef.current.forEach((el) => {
        if (!el) return
        const { i, li, len } = el.dataset
        const index = Number(i)
        const line = Number(li)
        const nx = (index + 0.5) / Number(len)
        const ny = (line + 0.5) / LINES.length

        let energy
        if (mouse.inside) {
          const dist = Math.hypot(mouse.x - nx, (mouse.y - ny) * 1.35)
          energy = Math.max(0, 1 - dist / 0.64)
        } else {
          energy = (0.5 + 0.5 * Math.sin(now / 620 + index * 0.72 + line * 1.15)) * 0.46
        }

        const lift = energy * 12
        const rot = (nx - 0.5) * energy * 4
        const scale = 1 + energy * 0.05
        const accent = (index + line) % 2 === 0 ? LIME : MAGENTA
        const mix = Math.min(1, energy * 1.45)

        el.style.transform = `translateY(${-lift}px) rotate(${rot}deg) scale(${scale})`
        el.style.color = mix > 0.1 ? accent : CREAM
        el.style.textShadow =
          mix > 0.18
            ? `${10 * energy}px 0 0 rgba(255,79,216,${0.6 * mix}), ${-10 * energy}px 0 0 rgba(200,245,66,${0.55 * mix})`
            : 'none'
      })
      raf = requestAnimationFrame(tick)
    }

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <h1 ref={wrapRef} className="kinetic hero-enter" style={{ '--d': '160ms' }}>
      {LINES.map((word, li) => (
        <span className="kinetic__line" key={word}>
          {word.split('').map((letter, i) => (
            <span
              key={`${word}-${letter}-${i}`}
              className="kinetic__char"
              data-i={i}
              data-li={li}
              data-len={word.length}
              ref={(node) => {
                charsRef.current[li * 4 + i] = node
              }}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
