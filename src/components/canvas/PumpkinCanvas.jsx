import { useRef, useEffect } from 'react'

/**
 * Rendu Canvas 2D de la citrouille avec découpe et flamme vacillante intérieure
 */
export function PumpkinCanvas({
  eyes = 'triangles',
  nose = 'triangle',
  mouth = 'smile',
  isLit = true,
  flicker = 1.0,
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)

    const cx = width / 2
    const cy = height / 2 + 10

    // 1. Tige de la citrouille (pédoncule vert sombre / boisé)
    ctx.save()
    ctx.fillStyle = '#263b20'
    ctx.beginPath()
    ctx.moveTo(cx - 10, cy - 120)
    ctx.quadraticCurveTo(cx - 15, cy - 160, cx + 5, cy - 170)
    ctx.quadraticCurveTo(cx + 20, cy - 165, cx + 12, cy - 120)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // 2. Tranches de la citrouille (effet de volume par superpositions d'ellipses)
    const lobes = [
      { x: cx - 110, y: cy, rx: 55, ry: 110, color: '#b8440d' },
      { x: cx + 110, y: cy, rx: 55, ry: 110, color: '#b8440d' },
      { x: cx - 60, y: cy, rx: 75, ry: 120, color: '#d95314' },
      { x: cx + 60, y: cy, rx: 75, ry: 120, color: '#d95314' },
      { x: cx, y: cy, rx: 85, ry: 125, color: '#ff6a1a' },
    ]

    lobes.forEach((lobe) => {
      ctx.save()
      const grad = ctx.createRadialGradient(
        lobe.x - 10,
        lobe.y - 20,
        15,
        lobe.x,
        lobe.y,
        lobe.rx + 20
      )
      grad.addColorStop(0, '#ff7d33')
      grad.addColorStop(0.7, lobe.color)
      grad.addColorStop(1, '#662208')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(lobe.x, lobe.y, lobe.rx, lobe.ry, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    // Sillons sombres pour accentuer les cotes
    ctx.save()
    ctx.strokeStyle = 'rgba(74, 21, 5, 0.45)'
    ctx.lineWidth = 3
    ;[-60, 60].forEach((ox) => {
      ctx.beginPath()
      ctx.ellipse(cx + ox, cy, Math.abs(ox) + 15, 122, 0, Math.PI * 0.2, Math.PI * 0.8)
      ctx.stroke()
      ctx.beginPath()
      ctx.ellipse(cx + ox, cy, Math.abs(ox) + 15, 122, 0, -Math.PI * 0.8, -Math.PI * 0.2)
      ctx.stroke()
    })
    ctx.restore()

    // 3. Découpes sculptées (avec flamme intérieure si allumée)
    const glowColor = isLit
      ? `rgba(255, 235, 150, ${Math.min(1, 0.85 * flicker)})`
      : 'rgba(25, 15, 10, 0.95)'
    const rimGlow = isLit
      ? `rgba(255, 120, 20, ${Math.min(1, 0.9 * flicker)})`
      : 'rgba(40, 20, 10, 0.8)'

    ctx.save()
    ctx.fillStyle = glowColor
    ctx.strokeStyle = rimGlow
    ctx.lineWidth = isLit ? 4 : 2
    if (isLit) {
      ctx.shadowColor = '#ff9922'
      ctx.shadowBlur = 18 * flicker
    }

    // --- YEUX ---
    if (eyes === 'triangles') {
      // Oeil gauche
      ctx.beginPath()
      ctx.moveTo(cx - 75, cy - 25)
      ctx.lineTo(cx - 35, cy - 25)
      ctx.lineTo(cx - 55, cy - 65)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Oeil droit
      ctx.beginPath()
      ctx.moveTo(cx + 35, cy - 25)
      ctx.lineTo(cx + 75, cy - 25)
      ctx.lineTo(cx + 55, cy - 65)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else if (eyes === 'menacing') {
      // Regard menaçant incliné
      ctx.beginPath()
      ctx.moveTo(cx - 80, cy - 45)
      ctx.lineTo(cx - 30, cy - 20)
      ctx.lineTo(cx - 50, cy - 60)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(cx + 80, cy - 45)
      ctx.lineTo(cx + 30, cy - 20)
      ctx.lineTo(cx + 50, cy - 60)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else if (eyes === 'crescent') {
      // Croissants de lune
      ;[-1, 1].forEach((dir) => {
        ctx.beginPath()
        ctx.arc(cx + dir * 55, cy - 35, 22, -Math.PI * 0.3, Math.PI * 0.8)
        ctx.quadraticCurveTo(cx + dir * 65, cy - 45, cx + dir * 55 + Math.cos(-Math.PI * 0.3) * 22, cy - 35 + Math.sin(-Math.PI * 0.3) * 22)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      })
    } else if (eyes === 'round') {
      // Yeux ronds ecarquilles
      ;[-1, 1].forEach((dir) => {
        ctx.beginPath()
        ctx.arc(cx + dir * 55, cy - 35, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
      })
    }

    // --- NEZ ---
    if (nose === 'triangle') {
      ctx.beginPath()
      ctx.moveTo(cx - 15, cy - 5)
      ctx.lineTo(cx + 15, cy - 5)
      ctx.lineTo(cx, cy - 30)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else if (nose === 'inverted') {
      ctx.beginPath()
      ctx.moveTo(cx - 15, cy - 25)
      ctx.lineTo(cx + 15, cy - 25)
      ctx.lineTo(cx, cy)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else if (nose === 'skull') {
      // Deux petites fentes façon crâne
      ctx.beginPath()
      ctx.ellipse(cx - 7, cy - 12, 3, 9, -0.2, 0, Math.PI * 2)
      ctx.ellipse(cx + 7, cy - 12, 3, 9, 0.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }

    // --- BOUCHE ---
    if (mouth === 'smile') {
      // Sourire en dents de scie classique
      ctx.beginPath()
      ctx.moveTo(cx - 85, cy + 30)
      ctx.lineTo(cx - 55, cy + 55)
      ctx.lineTo(cx - 40, cy + 42)
      ctx.lineTo(cx - 20, cy + 62)
      ctx.lineTo(cx, cy + 45)
      ctx.lineTo(cx + 20, cy + 62)
      ctx.lineTo(cx + 40, cy + 42)
      ctx.lineTo(cx + 55, cy + 55)
      ctx.lineTo(cx + 85, cy + 30)
      // Retour supérieur
      ctx.lineTo(cx + 55, cy + 38)
      ctx.lineTo(cx + 35, cy + 24)
      ctx.lineTo(cx + 15, cy + 38)
      ctx.lineTo(cx, cy + 26)
      ctx.lineTo(cx - 15, cy + 38)
      ctx.lineTo(cx - 35, cy + 24)
      ctx.lineTo(cx - 55, cy + 38)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else if (mouth === 'vampire') {
      // Sourire acéré avec crocs
      ctx.beginPath()
      ctx.moveTo(cx - 80, cy + 35)
      ctx.quadraticCurveTo(cx - 40, cy + 32, cx - 35, cy + 55) // croc gauche
      ctx.lineTo(cx - 25, cy + 32)
      ctx.lineTo(cx + 25, cy + 32)
      ctx.lineTo(cx + 35, cy + 55) // croc droit
      ctx.quadraticCurveTo(cx + 40, cy + 32, cx + 80, cy + 35)
      ctx.quadraticCurveTo(cx, cy + 75, cx - 80, cy + 35)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    } else if (mouth === 'stitched') {
      // Ligne cintrée avec cicatrices / points de suture
      ctx.beginPath()
      ctx.moveTo(cx - 80, cy + 45)
      ctx.quadraticCurveTo(cx, cy + 60, cx + 80, cy + 45)
      ctx.lineWidth = 5
      ctx.stroke()

      ;[-60, -35, -10, 15, 40, 65].forEach((pos) => {
        ctx.beginPath()
        ctx.moveTo(cx + pos, cy + 35)
        ctx.lineTo(cx + pos, cy + 65)
        ctx.lineWidth = 3
        ctx.stroke()
      })
    } else if (mouth === 'scream') {
      // Bouche béante de cri d'effroi
      ctx.beginPath()
      ctx.ellipse(cx, cy + 50, 32, 25, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }

    ctx.restore()
  }, [eyes, nose, mouth, isLit, flicker])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={380}
      className={`max-w-full h-auto select-none pointer-events-none drop-shadow-2xl ${className}`}
    />
  )
}
