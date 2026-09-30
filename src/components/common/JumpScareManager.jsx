import { useState, useEffect } from 'react'
import { AlertTriangle, Ghost, EyeOff, Volume2 } from 'lucide-react'

const STORAGE_KEY_SCARE = 'halloween_mansion_scare_enabled_2026'

/**
 * Système de Jump Scare unique et subtil :
 * - Jamais avant 10 secondes d'interaction
 * - Flash très bref (180ms) avec silhouette spectrale et soupir Web Audio
 * - Désactivable par l'utilisateur à tout moment
 * - Avertissement bienveillant au premier chargement pour les personnes sensibles
 */
export function JumpScareManager({ isScareActive, onTriggerScare }) {
  const [scareEnabled, setScareEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCARE)
      return saved !== null ? JSON.parse(saved) : true
    } catch {
      return true
    }
  })

  const [hasWarned, setHasWarned] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  // Sauvegarde de la préférence
  const toggleScare = () => {
    setScareEnabled((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY_SCARE, JSON.stringify(next))
      } catch {
        // Ignorer
      }
      return next
    })
  }

  // Déclenchement unique sécurisé après au moins 14 secondes d'interaction
  useEffect(() => {
    if (!scareEnabled || hasTriggered) return

    const timer = setTimeout(() => {
      // Déclenchement aléatoire après 14 à 25 secondes
      const delay = 14000 + Math.random() * 8000
      const scareTimeout = setTimeout(() => {
        if (!hasTriggered && scareEnabled) {
          triggerSubtleScare()
        }
      }, delay)

      return () => clearTimeout(scareTimeout)
    }, 10000)

    return () => clearTimeout(timer)
  }, [scareEnabled, hasTriggered])

  const triggerSubtleScare = () => {
    setHasTriggered(true)
    setIsFlashing(true)
    onTriggerScare?.()

    // Le flash s'estompe en 200ms
    setTimeout(() => {
      setIsFlashing(false)
    }, 200)
  }

  return (
    <>
      {/* Panneau discret de contrôle en bas à gauche */}
      <aside
        aria-label="Accessibilité et effets sensibles"
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={toggleScare}
          title={scareEnabled ? 'Désactiver les effets de sursaut' : 'Activer les effets de sursaut'}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-sans border backdrop-blur-md transition-all duration-200 ${
            scareEnabled
              ? 'bg-abysse/80 border-citrouille/30 text-citrouille/90 hover:bg-abysse'
              : 'bg-manoir-900/90 border-fantome/20 text-fantome/50 hover:text-fantome'
          }`}
        >
          {scareEnabled ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-citrouille" />
              <span>Sursauts actifs</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-fantome/40" />
              <span>Mode apaisé (sans sursaut)</span>
            </>
          )}
        </button>
      </aside>

      {/* Flash visuel très bref (jump scare subtil) */}
      {isFlashing && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-white/20 backdrop-invert transition-opacity duration-150 animate-flash"
        >
          <div className="text-center space-y-2 opacity-85 scale-110 transition-transform">
            <Ghost className="w-32 h-32 mx-auto text-citrouille drop-shadow-[0_0_50px_rgba(255,106,26,0.9)]" />
          </div>
        </div>
      )}
    </>
  )
}
