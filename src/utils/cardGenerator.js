/**
 * Générateur haute définition de la carte Halloween (1080x1920 - Format Story)
 * Rendu 100% côté client via Canvas 2D API sans aucune requête réseau.
 */

const MONSTER_LABELS = {
  fantome: 'L Âme Errante',
  vampire: 'Le Seigneur Éternel',
  sorciere: 'L Invocatrice des Ombres',
  'loup-garou': 'La Bête de Pleine Lune',
  momie: 'Le Gardien des Sarcophages',
}

export function generateHalloweenCard({ pumpkin, monster }) {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1920
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 1. Fond sombre dégradé (#07060a vers #1b1030)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920)
  bgGrad.addColorStop(0, '#07060a')
  bgGrad.addColorStop(0.5, '#120b22')
  bgGrad.addColorStop(1, '#07060a')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, 1080, 1920)

  // Halo mystique violet au centre
  const centerGlow = ctx.createRadialGradient(540, 960, 50, 540, 960, 600)
  centerGlow.addColorStop(0, 'rgba(255, 106, 26, 0.12)')
  centerGlow.addColorStop(0.6, 'rgba(27, 16, 48, 0.35)')
  centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = centerGlow
  ctx.fillRect(0, 0, 1080, 1920)

  // 2. Cadre ornemental gothique
  ctx.save()
  ctx.strokeStyle = 'rgba(255, 106, 26, 0.35)'
  ctx.lineWidth = 2
  ctx.strokeRect(60, 60, 960, 1800)

  ctx.strokeStyle = 'rgba(233, 228, 208, 0.15)'
  ctx.lineWidth = 1
  ctx.strokeRect(75, 75, 930, 1770)

  // Coins décoratifs
  const drawCorner = (x, y, dx, dy) => {
    ctx.beginPath()
    ctx.moveTo(x, y + dy * 30)
    ctx.lineTo(x, y)
    ctx.lineTo(x + dx * 30, y)
    ctx.strokeStyle = '#ff6a1a'
    ctx.lineWidth = 3
    ctx.stroke()
  }
  drawCorner(60, 60, 1, 1)
  drawCorner(1020, 60, -1, 1)
  drawCorner(60, 1860, 1, -1)
  drawCorner(1020, 1860, -1, -1)
  ctx.restore()

  // 3. Typographies & En-tête
  ctx.save()
  ctx.textAlign = 'center'

  // Surtitre
  ctx.font = '600 24px "Inter", sans-serif'
  ctx.fillStyle = '#ff6a1a'
  ctx.fillText('LE MANOIR DES OMBRES • HALLOWEEN 2026', 540, 180)

  // Titre principal
  ctx.font = '400 72px "Cormorant Garamond", serif'
  ctx.fillStyle = '#e9e4d0'
  ctx.fillText('Offrande des Ténèbres', 540, 270)

  // Sous-titre ou Monstre révélé
  if (monster && MONSTER_LABELS[monster]) {
    ctx.font = 'italic 34px "Cormorant Garamond", serif'
    ctx.fillStyle = 'rgba(233, 228, 208, 0.75)'
    ctx.fillText(`L incarnation du miroir : ${MONSTER_LABELS[monster]}`, 540, 340)
  }
  ctx.restore()

  // 4. Rendu de la Citrouille au centre (taille x2.4)
  const cx = 540
  const cy = 960

  // Pédoncule
  ctx.save()
  ctx.fillStyle = '#263b20'
  ctx.beginPath()
  ctx.moveTo(cx - 25, cy - 280)
  ctx.quadraticCurveTo(cx - 35, cy - 380, cx + 15, cy - 400)
  ctx.quadraticCurveTo(cx + 45, cy - 390, cx + 28, cy - 280)
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  // Lobes de la citrouille
  const lobes = [
    { x: cx - 260, y: cy, rx: 130, ry: 260, color: '#b8440d' },
    { x: cx + 260, y: cy, rx: 130, ry: 260, color: '#b8440d' },
    { x: cx - 140, y: cy, rx: 180, ry: 290, color: '#d95314' },
    { x: cx + 140, y: cy, rx: 180, ry: 290, color: '#d95314' },
    { x: cx, y: cy, rx: 205, ry: 300, color: '#ff6a1a' },
  ]

  lobes.forEach((lobe) => {
    ctx.save()
    const grad = ctx.createRadialGradient(
      lobe.x - 20,
      lobe.y - 40,
      30,
      lobe.x,
      lobe.y,
      lobe.rx + 40
    )
    grad.addColorStop(0, '#ff7d33')
    grad.addColorStop(0.7, lobe.color)
    grad.addColorStop(1, '#551c07')

    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.ellipse(lobe.x, lobe.y, lobe.rx, lobe.ry, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })

  // Sillons
  ctx.save()
  ctx.strokeStyle = 'rgba(74, 21, 5, 0.45)'
  ctx.lineWidth = 6
  ;[-140, 140].forEach((ox) => {
    ctx.beginPath()
    ctx.ellipse(cx + ox, cy, Math.abs(ox) + 35, 290, 0, Math.PI * 0.2, Math.PI * 0.8)
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(cx + ox, cy, Math.abs(ox) + 35, 290, 0, -Math.PI * 0.8, -Math.PI * 0.2)
    ctx.stroke()
  })
  ctx.restore()

  // Découpes lumineuses
  ctx.save()
  ctx.fillStyle = 'rgba(255, 240, 160, 0.95)'
  ctx.strokeStyle = '#ff9922'
  ctx.lineWidth = 8
  ctx.shadowColor = '#ff6a1a'
  ctx.shadowBlur = 40

  const { eyes, nose, mouth } = pumpkin

  // Yeux
  if (eyes === 'triangles') {
    ctx.beginPath()
    ctx.moveTo(cx - 180, cy - 60)
    ctx.lineTo(cx - 80, cy - 60)
    ctx.lineTo(cx - 130, cy - 160)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(cx + 80, cy - 60)
    ctx.lineTo(cx + 180, cy - 60)
    ctx.lineTo(cx + 130, cy - 160)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  } else if (eyes === 'menacing') {
    ctx.beginPath()
    ctx.moveTo(cx - 190, cy - 110)
    ctx.lineTo(cx - 70, cy - 50)
    ctx.lineTo(cx - 120, cy - 150)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(cx + 190, cy - 110)
    ctx.lineTo(cx + 70, cy - 50)
    ctx.lineTo(cx + 120, cy - 150)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  } else if (eyes === 'crescent') {
    ;[-1, 1].forEach((dir) => {
      ctx.beginPath()
      ctx.arc(cx + dir * 130, cy - 90, 52, -Math.PI * 0.3, Math.PI * 0.8)
      ctx.quadraticCurveTo(cx + dir * 155, cy - 115, cx + dir * 130 + Math.cos(-Math.PI * 0.3) * 52, cy - 90 + Math.sin(-Math.PI * 0.3) * 52)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    })
  } else {
    ;[-1, 1].forEach((dir) => {
      ctx.beginPath()
      ctx.arc(cx + dir * 130, cy - 90, 48, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    })
  }

  // Nez
  if (nose === 'triangle') {
    ctx.beginPath()
    ctx.moveTo(cx - 35, cy - 10)
    ctx.lineTo(cx + 35, cy - 10)
    ctx.lineTo(cx, cy - 70)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  } else if (nose === 'inverted') {
    ctx.beginPath()
    ctx.moveTo(cx - 35, cy - 60)
    ctx.lineTo(cx + 35, cy - 60)
    ctx.lineTo(cx, cy)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  } else {
    ctx.beginPath()
    ctx.ellipse(cx - 16, cy - 30, 8, 22, -0.2, 0, Math.PI * 2)
    ctx.ellipse(cx + 16, cy - 30, 8, 22, 0.2, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }

  // Bouche
  if (mouth === 'smile') {
    ctx.beginPath()
    ctx.moveTo(cx - 200, cy + 70)
    ctx.lineTo(cx - 130, cy + 130)
    ctx.lineTo(cx - 90, cy + 100)
    ctx.lineTo(cx - 50, cy + 145)
    ctx.lineTo(cx, cy + 105)
    ctx.lineTo(cx + 50, cy + 145)
    ctx.lineTo(cx + 90, cy + 100)
    ctx.lineTo(cx + 130, cy + 130)
    ctx.lineTo(cx + 200, cy + 70)
    ctx.lineTo(cx + 130, cy + 90)
    ctx.lineTo(cx + 80, cy + 55)
    ctx.lineTo(cx + 35, cy + 90)
    ctx.lineTo(cx, cy + 60)
    ctx.lineTo(cx - 35, cy + 90)
    ctx.lineTo(cx - 80, cy + 55)
    ctx.lineTo(cx - 130, cy + 90)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  } else if (mouth === 'vampire') {
    ctx.beginPath()
    ctx.moveTo(cx - 190, cy + 85)
    ctx.quadraticCurveTo(cx - 95, cy + 75, cx - 80, cy + 135)
    ctx.lineTo(cx - 60, cy + 75)
    ctx.lineTo(cx + 60, cy + 75)
    ctx.lineTo(cx + 80, cy + 135)
    ctx.quadraticCurveTo(cx + 95, cy + 75, cx + 190, cy + 85)
    ctx.quadraticCurveTo(cx, cy + 180, cx - 190, cy + 85)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  } else if (mouth === 'stitched') {
    ctx.beginPath()
    ctx.moveTo(cx - 190, cy + 105)
    ctx.quadraticCurveTo(cx, cy + 140, cx + 190, cy + 105)
    ctx.lineWidth = 12
    ctx.stroke()

    ;[-140, -85, -25, 35, 95, 150].forEach((pos) => {
      ctx.beginPath()
      ctx.moveTo(cx + pos, cy + 80)
      ctx.lineTo(cx + pos, cy + 155)
      ctx.lineWidth = 7
      ctx.stroke()
    })
  } else {
    ctx.beginPath()
    ctx.ellipse(cx, cy + 120, 75, 60, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }
  ctx.restore()

  // 5. Message rituel au bas de la carte
  ctx.save()
  ctx.textAlign = 'center'
  ctx.font = 'italic 42px "Cormorant Garamond", serif'
  ctx.fillStyle = '#ff6a1a'
  const displayMsg = pumpkin.message ? `« ${pumpkin.message} »` : '« Que la nuit veille sur nous... »'
  ctx.fillText(displayMsg, 540, 1480)

  ctx.font = '300 22px "Inter", sans-serif'
  ctx.fillStyle = 'rgba(233, 228, 208, 0.5)'
  ctx.fillText('Créé dans l obscurité du Manoir des Ombres', 540, 1570)
  ctx.fillText('31 Octobre 2026', 540, 1610)
  ctx.restore()

  // 6. Déclenchement du téléchargement en PNG
  const dataUrl = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = 'manoir-des-ombres-halloween-2026.png'
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
