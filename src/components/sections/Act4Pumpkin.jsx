import { useState } from 'react'
import { Sparkles, Download, Share2 } from 'lucide-react'

export function Act4Pumpkin({ onDownloadCard, onShareLink }) {
  const [message, setMessage] = useState('')

  return (
    <section
      id="acte-4"
      aria-labelledby="title-acte-4"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-2xl mx-auto w-full space-y-12 text-center">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-citrouille font-sans font-medium">
            Acte IV &bull; L Offrande des Tenebres
          </p>
          <h2
            id="title-acte-4"
            className="font-serif text-4xl md:text-6xl font-normal text-fantome-pure"
          >
            La Citrouille des Ombres
          </h2>
          <p className="font-sans text-sm text-fantome-dim font-light leading-relaxed max-w-lg mx-auto">
            Gavez le fruit de la nuit d une flamme interieure et gravez vos mots avant la levee du jour.
          </p>
        </header>

        {/* Espace de sculpture & gravure */}
        <div className="p-8 rounded-3xl bg-abysse/50 border border-fantome/15 backdrop-blur-md shadow-2xl space-y-6">
          <div className="space-y-2 text-left">
            <div className="flex justify-between items-center text-xs font-mono text-fantome/60">
              <label htmlFor="pumpkin-msg">Votre serment ou message (max 40 caracteres)</label>
              <span>{message.length} / 40</span>
            </div>
            <input
              id="pumpkin-msg"
              type="text"
              maxLength={40}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Que la nuit veille sur nous..."
              className="w-full px-4 py-3 rounded-xl bg-manoir-900/90 border border-fantome/15 text-fantome-pure placeholder:text-fantome/30 text-sm focus:outline-none focus:border-citrouille focus:ring-1 focus:ring-citrouille transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-fantome/10">
            <button
              type="button"
              onClick={onDownloadCard}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-fantome/10 hover:bg-fantome/20 text-fantome-pure font-sans text-xs tracking-wider uppercase font-medium border border-fantome/20 transition-all duration-300"
            >
              <Download className="w-4 h-4 text-citrouille" />
              <span>Telecharger ma carte</span>
            </button>

            <button
              type="button"
              onClick={onShareLink}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-citrouille hover:bg-citrouille-light text-manoir-900 font-sans text-xs tracking-wider uppercase font-semibold shadow-lg shadow-citrouille/20 transition-all duration-300"
            >
              <Share2 className="w-4 h-4 text-manoir-900" />
              <span>Copier mon lien</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
