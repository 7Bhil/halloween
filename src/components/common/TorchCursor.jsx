import { useState, useEffect, useRef } from 'react'

export function TorchCursor({ enabled = true }) {
  const [pos, setPos] = useState({ x: -500, y: -500 })
  const [isVisible, setIsVisible] = useState(false)
  const targetPos = useRef({ x: -500, y: -500 })

  useEffect(() => {
    if (!enabled) return

    // Centrage initial de la torche
    targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    setIsVisible(true)

    const handlePointerMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        targetPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        setIsVisible(true)
      }
    }

    // Support optionnel du gyroscope mobile
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        // Translation douce selon l'inclinaison
        const tiltX = (e.gamma / 45) * (window.innerWidth / 3)
        const tiltY = ((e.beta - 45) / 45) * (window.innerHeight / 3)
        targetPos.current = {
          x: Math.max(50, Math.min(window.innerWidth - 50, window.innerWidth / 2 + tiltX)),
          y: Math.max(50, Math.min(window.innerHeight - 50, window.innerHeight / 2 + tiltY)),
        }
        setIsVisible(true)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('touchmove', handleTouchMove)

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation)
    }

    // Interpolation fluide vers le curseur
    let animId
    const loop = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.15,
        y: prev.y + (targetPos.current.y - prev.y) * 0.15,
      }))
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handleTouchMove)
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }
  }, [enabled])

  if (!enabled || !isVisible) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-700"
      style={{
        background: `radial-gradient(circle 240px at ${pos.x}px ${pos.y}px, rgba(255, 106, 26, 0.04) 0%, rgba(27, 16, 48, 0.5) 120px, rgba(7, 6, 10, 0.94) 240px, rgba(7, 6, 10, 0.98) 100%)`,
      }}
      aria-hidden="true"
    />
  )
}
