import { useState } from 'react'
import { Flame } from 'lucide-react'

export default function App() {
  const [lightsOn, setLightsOn] = useState(false)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-nuit text-slate-100 relative overflow-hidden">
      {/* Halo de brume sombre */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-citrouille/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8 p-8 rounded-3xl border border-white/10 bg-nuit-800/60 backdrop-blur-md shadow-2xl">
        <header className="space-y-3">
          <div className="w-12 h-12 rounded-full bg-citrouille/20 flex items-center justify-center mx-auto text-citrouille">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Halloween 2026
          </h1>
          <p className="text-sm text-slate-400 font-light">
            Socle technique configure : React, Vite et Tailwind CSS v3.
          </p>
        </header>

        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setLightsOn((l) => !l)}
            className="px-6 py-2.5 rounded-full bg-citrouille hover:bg-citrouille-light active:bg-citrouille-dark text-white text-xs tracking-wider uppercase font-medium shadow-lg shadow-citrouille/20 transition-all"
          >
            {lightsOn ? 'Eteindre les lanternes' : 'Allumer les lanternes'}
          </button>

          {lightsOn && (
            <p className="text-xs text-citrouille animate-fadeIn font-mono">
              Les veilleuses de la nuit s eveillent...
            </p>
          )}
        </section>

        <footer className="text-[11px] font-mono text-slate-500 border-t border-white/10 pt-4">
          Branche developp &bull; Deploiement pret pour Netlify / Vercel
        </footer>
      </div>
    </main>
  )
}
