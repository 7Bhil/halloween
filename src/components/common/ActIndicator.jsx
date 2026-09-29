import { ChevronDown } from 'lucide-react'

const ACT_TITLES = {
  1: 'Le Portail',
  2: 'Le Hall & la Bibliotheque',
  3: 'Le Miroir des Ames',
  4: 'La Citrouille Obscure',
}

export function ActIndicator({ activeAct, totalActs = 4 }) {
  return (
    <aside
      aria-label="Progression dans le manoir"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500"
    >
      <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-manoir-900/80 backdrop-blur-md border border-fantome/15 shadow-xl">
        <span className="text-[11px] font-mono tracking-widest text-citrouille uppercase font-medium">
          Acte {activeAct} / {totalActs}
        </span>
        <span className="text-fantome/30 text-xs">&bull;</span>
        <span className="text-xs font-serif text-fantome-dim italic">
          {ACT_TITLES[activeAct] || 'Exploration'}
        </span>
      </div>
      <ChevronDown className="w-4 h-4 text-fantome/40 animate-bounce" />
    </aside>
  )
}
