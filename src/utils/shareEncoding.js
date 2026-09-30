/**
 * Utilitaires d'encodage, décodage et assainissement (anti-XSS) du partage par URL.
 * Format du paramètre : ?c=<base64_json>
 */

const ALLOWED_EYES = ['triangles', 'menacing', 'crescent', 'round']
const ALLOWED_NOSES = ['triangle', 'inverted', 'skull']
const ALLOWED_MOUTHS = ['smile', 'vampire', 'stitched', 'scream']
const ALLOWED_MONSTERS = ['fantome', 'vampire', 'sorciere', 'loup-garou', 'momie']

export function sanitizeText(str, maxLength = 40) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/[&<>"']/g, (m) => {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }
      return map[m] || m
    })
    .slice(0, maxLength)
    .trim()
}

export function encodeSharePayload(pumpkin, monster) {
  try {
    const data = {
      e: pumpkin.eyes,
      n: pumpkin.nose,
      m: pumpkin.mouth,
      msg: (pumpkin.message || '').slice(0, 40),
      mon: monster || null,
    }
    const jsonStr = JSON.stringify(data)
    // Encodage Base64 UTF-8 sécurisé compatible navigateur
    return btoa(encodeURIComponent(jsonStr))
  } catch (err) {
    console.error('Erreur encodage partage:', err)
    return null
  }
}

export function decodeSharePayload(encoded) {
  if (!encoded || typeof encoded !== 'string') return null
  if (encoded.length > 500) return null // Protection contre les payloads excessifs

  try {
    const jsonStr = decodeURIComponent(atob(encoded))
    const parsed = JSON.parse(jsonStr)

    const eyes = ALLOWED_EYES.includes(parsed.e) ? parsed.e : 'triangles'
    const nose = ALLOWED_NOSES.includes(parsed.n) ? parsed.n : 'triangle'
    const mouth = ALLOWED_MOUTHS.includes(parsed.m) ? parsed.m : 'smile'
    const message = sanitizeText(parsed.msg || 'Que la nuit veille sur nous...', 40)
    const monster = ALLOWED_MONSTERS.includes(parsed.mon) ? parsed.mon : null

    return {
      pumpkin: { eyes, nose, mouth, message },
      monster,
    }
  } catch {
    return null
  }
}
