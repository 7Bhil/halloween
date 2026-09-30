import { useState, useEffect } from 'react'

/**
 * Version de secours 2D pour les appareils sans WebGL ou avec prefers-reduced-motion
 * Utilise un masque radial-gradient en CSS pur avec suivi du pointeur,
 * un grain d'ambiance et des ombres douces.
 */
export function Fallback2DBackground({ torchActive = true }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }) // Pourcentage
  const [flicker, setFlicker] = useState(1.0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePos({ x, y })
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const x = (e.touches[0].clientX / window.innerWidth) * 100
        const y = (e.touches[0].clientY / window.innerHeight) * 100
        setMousePos({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // Scintillement subtil de la torche
  useEffect(() => {
    if (!torchActive) return
    const interval = setInterval(() => {
      setFlicker(0.92 + Math.random() * 0.16)
    }, 100)
    return () => clearInterval(interval)
  }, [torchActive])

  const lightRadius = torchActive ? `${240 * flicker}px` : '0px'

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-manoir-900">
      {/* Texture d'arrière-plan gothique 2D avec colonnes stylisées */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1b1030_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Silhouette stylisée de colonnes et arches */}
      <div className="absolute inset-0 flex justify-between px-8 opacity-20 pointer-events-none">
        <div className="w-16 h-full bg-gradient-to-r from-abysse to-transparent border-r border-fantome/10" />
        <div className="w-16 h-full bg-gradient-to-l from-abysse to-transparent border-l border-fantome/10" />
      </div>

      {/* Masque de la torche en radial-gradient CSS pur */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: torchActive
            ? `radial-gradient(circle ${lightRadius} at ${mousePos.x}% ${mousePos.y}%, rgba(255, 106, 26, 0.18) 0%, rgba(27, 16, 48, 0.5) 55%, rgba(7, 6, 10, 0.98) 100%)`
            : '#07060a',
        }}
      />

      {/* Grain et vignetage cinéma */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.95)]" />
    </div>
  )
}
