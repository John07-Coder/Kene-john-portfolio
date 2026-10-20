import { useEffect, useRef } from 'react'

const LINES = ['KENE', 'JOHN']
const LIME = '#c8f542'
const MAGENTA = '#ff4fd8'

export default function KineticName() {
  const wrapRef = useRef(null)
  const charsRef = useRef([])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const chars = charsRef.current.filter(Boolean)
    const mouse = { x: 0.5, y: 0.5 }
    let raf = 0
    let hovering = false
    let visible = true
    let box = { left: 0, top: 0, width: 1, height: 1 }

    const paint = () => {
      for (const el of chars) {
        const index = Number(el.dataset.i)
        const line = Number(el.dataset.li)
        const len = Number(el.dataset.len)
        const nx = (index + 0.5) / len
        const ny = (line + 0.5) / LINES.length
        const dist = Math.hypot(mouse.x - nx, (mouse.y - ny) * 1.35)
        const energy = Math.max(0, 1 - dist / 0.64)
        const hot = energy > 0.18
        const flag = hot ? '1' : '0'
        const lift = -energy * 12
        const rot = (nx - 0.5) * energy * 4
        const scale = 1 + energy * 0.05

        el.style.transform = `translate3d(0, ${lift.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`
        if (el.dataset.hot !== flag) {
          el.dataset.hot = flag
          el.style.color = hot ? ((index + line) % 2 === 0 ? LIME : MAGENTA) : ''
        }
      }
    }

    const loop = () => {
      paint()
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (!hovering || !visible) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(loop)
    }

    const stop = () => {
      cancelAnimationFrame(raf)
    }

    const onEnter = (event) => {
      box = wrap.getBoundingClientRect()
      hovering = true
      mouse.x = (event.clientX - box.left) / (box.width || 1)
      mouse.y = (event.clientY - box.top) / (box.height || 1)
      wrap.classList.add('kinetic--live')
      start()
    }

    const onMove = (event) => {
      mouse.x = (event.clientX - box.left) / (box.width || 1)
      mouse.y = (event.clientY - box.top) / (box.height || 1)
    }

    const onLeave = () => {
      hovering = false
      stop()
      wrap.classList.remove('kinetic--live')
      for (const el of chars) {
        el.style.transform = ''
        el.style.color = ''
        delete el.dataset.hot
      }
    }

    const onVisibility = (entries) => {
      visible = entries[0].isIntersecting
      wrap.classList.toggle('is-paused', !visible)
      if (visible) start()
      else stop()
    }

    const observer = new IntersectionObserver(onVisibility, { threshold: 0 })
    observer.observe(wrap)
    wrap.addEventListener('pointerenter', onEnter)
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      wrap.removeEventListener('pointerenter', onEnter)
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
              style={{ '--i': li * 4 + i }}
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
