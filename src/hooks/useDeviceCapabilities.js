import { useState, useEffect } from 'react'

/**
 * Hook de détection des performances du matériel et préférences d accessibilité
 * Retourne shouldFallback2D = true si :
 * - WebGL n'est pas supporté ou rendu par CPU (SwiftShader / llvmpipe)
 * - L utilisateur active `prefers-reduced-motion`
 * - L appareil a peu de cœurs CPU (<= 2) ou peu de mémoire vive
 */
export function useDeviceCapabilities() {
  const [shouldFallback2D, setShouldFallback2D] = useState(false)
  const [isManualOverride, setIsManualOverride] = useState(false)

  useEffect(() => {
    // 1. Vérifier si l'utilisateur a désactivé les animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setShouldFallback2D(true)
      return
    }

    // 2. Vérifier les capacités CPU / RAM
    const isLowConcurrency = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4

    // 3. Détecter le GPU via WebGL
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setShouldFallback2D(true)
        return
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
        // Si le rendu est logiciel / émulé (pas de vrai GPU)
        if (
          renderer.includes('swiftshader') ||
          renderer.includes('llvmpipe') ||
          renderer.includes('software')
        ) {
          setShouldFallback2D(true)
          return
        }
      }
    } catch {
      setShouldFallback2D(true)
      return
    }

    if (isLowConcurrency || isLowMemory) {
      setShouldFallback2D(true)
    }
  }, [])

  const toggleMode = () => {
    setIsManualOverride(true)
    setShouldFallback2D((prev) => !prev)
  }

  return {
    shouldFallback2D,
    isManualOverride,
    toggleMode,
  }
}
