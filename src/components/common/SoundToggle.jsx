import { Volume2, VolumeX } from 'lucide-react'

export function SoundToggle({ isPlaying, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Couper l ambiance sonore' : 'Activer l ambiance sonore'}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full border border-fantome/20 bg-manoir-900/75 backdrop-blur-md text-xs tracking-wider uppercase text-fantome-dim hover:text-fantome-pure hover:border-citrouille/50 transition-all duration-300 group"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-citrouille animate-pulse" />
          <span className="font-sans">Son actif</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
          <span className="font-sans">Son coupe</span>
        </>
      )}
    </button>
  )
}
