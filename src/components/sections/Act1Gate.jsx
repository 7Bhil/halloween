import { Flame, ShieldAlert } from 'lucide-react'

export function Act1Gate({ onEnter, torchActive }) {
  return (
    <section
      id="acte-1"
      aria-labelledby="title-acte-1"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10"
    >
      {/* Halo de bougie intimiste */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-citrouille/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center space-y-8">
        {/* Flamme de bougie solitaire */}
        <div className="relative flex flex-col items-center" aria-hidden="true">
          <div className="w-2.5 h-6 rounded-full bg-gradient-to-t from-citrouille-dark via-citrouille to-fantome-pure shadow-[0_0_24px_rgba(255,106,26,0.85)] animate-pulse" />
          <div className="w-0.5 h-2.5 bg-fantome/40" />
          <div className="w-3.5 h-10 bg-gradient-to-b from-fantome-dim to-abysse rounded-t-sm" />
        </div>

        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-citrouille font-sans font-medium">
            Halloween 2026 &bull; Nocturne
          </p>
          <h1
            id="title-acte-1"
            className="font-serif text-5xl md:text-7xl font-normal tracking-wide text-fantome-pure leading-[1.05]"
          >
            Le Manoir des Ombres
          </h1>
          <p className="font-sans text-sm md:text-base text-fantome-dim max-w-md mx-auto font-light leading-relaxed">
            Un domaine plonge dans les tenebres. Seule la lueur de votre lampe revelera ce qui s y cache.
          </p>
        </header>

        {/* Avertissement discret sensibilite */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-abysse/50 border border-fantome/10 text-[11px] font-mono text-fantome/60">
          <ShieldAlert className="w-3.5 h-3.5 text-citrouille/80 shrink-0" />
          <span>Ambiance feutree &bull; Effets sonores et sursauts desactives au choix</span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-b from-citrouille to-citrouille-dark text-manoir-900 font-sans text-xs tracking-[0.2em] uppercase font-semibold shadow-[0_8px_30px_rgba(255,106,26,0.35)] hover:shadow-[0_12px_40px_rgba(255,106,26,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 pointer-events-auto"
          >
            <Flame className="w-4 h-4 text-manoir-900 group-hover:rotate-12 transition-transform" />
            <span>Franchir le portail</span>
          </button>
        </div>
      </div>
    </section>
  )
}
