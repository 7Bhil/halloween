import { useState, useEffect, useRef } from 'react'
import { Eye, BookOpen, Clock, Compass, Key, Sparkles, X, Check } from 'lucide-react'
import { mansionAudio } from '../../utils/mansionAudio'

const RELICS = [
  {
    id: 'portrait',
    name: 'Le Portrait Ancestral',
    room: 'Le Grand Escalier',
    icon: Eye,
    hint: 'Un regard peint à l huile dont les prunelles traquent silencieusement vos moindres pas.',
    lore: 'Lord Alistair Blackwood, disparu une nuit sans lune en 1888. Ses yeux semblent suivre la lueur vacillante de votre lampe.',
    specialType: 'portrait',
  },
  {
    id: 'grimoire',
    name: 'Le Grimoire sans Fin',
    room: 'La Bibliothèque Poussiéreuse',
    icon: BookOpen,
    hint: 'Une reliure de cuir tannée, arrêtée sur un psaume oublié depuis un siècle.',
    lore: '« Lorsque la quatrième bougie s éteint, les ombres cessent d obéir aux murs. » Une chaleur sourde émane de la page.',
    specialType: 'grimoire',
  },
  {
    id: 'horloge',
    name: 'L Horloge Figée',
    room: 'Le Salon des Glaces',
    icon: Clock,
    hint: 'Ses aiguilles d airain se sont bloquées à minuit précis il y a plus de cent ans.',
    lore: 'Le balancier ne bat plus la mesure du temps des vivants, mais un faible cliquetis résonne quand vous approchez.',
    specialType: 'horloge',
  },
  {
    id: 'boussole',
    name: 'La Boussole Dévoyée',
    room: 'L Observatoire Sombre',
    icon: Compass,
    hint: 'Son aiguille en argent ne cherche plus le Nord, mais l âme la plus proche.',
    lore: 'L aiguille oscille de manière fébrile, tournant sur elle-même au rythme accéléré de vos pulsations cardiaques.',
    specialType: 'boussole',
  },
  {
    id: 'cle',
    name: 'La Clef d Os',
    room: 'L Antichambre Fermée',
    icon: Key,
    hint: 'Sculptée dans une matière inconnue, encore tiède au creux de la paume.',
    lore: 'Elle ne possède aucun panneton ordinaire, mais s adapte à la forme des serrures interdites du domaine.',
    specialType: 'cle',
  },
]

export function Act2Mansion({ foundObjects = [], onFindObject }) {
  const [selectedRelic, setSelectedRelic] = useState(null)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const portraitRef = useRef(null)

  const total = RELICS.length
  const foundCount = foundObjects.length

  // Calcul du suivi du regard du portrait vers la souris
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!portraitRef.current) return
      const rect = portraitRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
      const dist = Math.min(6, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 35)

      setPupilOffset({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleInspect = (relic) => {
    setSelectedRelic(relic)
    if (!foundObjects.includes(relic.id)) {
      onFindObject?.(relic.id)
      mansionAudio.playRelicFound()
    }
  }

  return (
    <section
      id="acte-2"
      aria-labelledby="title-acte-2"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <header className="text-center space-y-4 max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-citrouille font-sans font-medium">
            Acte II &bull; L Exploration
          </p>
          <h2
            id="title-acte-2"
            className="font-serif text-4xl md:text-5xl font-normal text-fantome-pure"
          >
            Le Hall et la Bibliothèque
          </h2>
          <p className="font-sans text-sm text-fantome-dim font-light leading-relaxed">
            Balayez les ténèbres avec votre faisceau. Inspectez et découvrez les cinq reliques scellées pour percer les secrets du manoir.
          </p>

          {/* Compteur discret avec indication de tension */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-abysse/70 border border-citrouille/30 text-xs font-mono text-fantome-pure backdrop-blur-md">
            <span className="text-citrouille font-semibold">{foundCount} / {total}</span>
            <span>reliques découvertes</span>
            {foundCount === total && (
              <span className="inline-flex items-center gap-1 text-[11px] text-citrouille/90 ml-2 font-sans">
                <Check className="w-3 h-3 text-citrouille" /> Passage libéré
              </span>
            )}
          </div>
        </header>

        {/* Grille d exploration interactive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RELICS.map((relic) => {
            const Icon = relic.icon
            const isFound = foundObjects.includes(relic.id)
            const isPortrait = relic.id === 'portrait'

            return (
              <button
                key={relic.id}
                ref={isPortrait ? portraitRef : null}
                type="button"
                onClick={() => handleInspect(relic)}
                className={`relative p-6 rounded-2xl border text-left transition-all duration-300 group flex flex-col justify-between h-48 backdrop-blur-md overflow-hidden ${
                  isFound
                    ? 'bg-abysse/85 border-citrouille/60 shadow-[0_0_25px_rgba(255,106,26,0.18)] ring-1 ring-citrouille/20'
                    : 'bg-manoir-800/60 border-fantome/10 hover:border-citrouille/40 hover:bg-manoir-800/80 hover:shadow-[0_0_15px_rgba(255,106,26,0.1)]'
                }`}
              >
                {/* Lueur subtile en fond lors de la decouverte */}
                {isFound && (
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-citrouille/10 rounded-full blur-2xl pointer-events-none" />
                )}

                <div className="flex items-start justify-between w-full">
                  <span className="text-[10px] font-mono tracking-wider text-citrouille uppercase">
                    {relic.room}
                  </span>

                  {/* Icone ou animation d yeux pour le portrait */}
                  {isPortrait ? (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-manoir-900 border border-fantome/15">
                      <div className="w-3.5 h-3.5 rounded-full border border-citrouille/60 flex items-center justify-center bg-manoir-800">
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-citrouille transition-transform duration-75"
                          style={{
                            transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                          }}
                        />
                      </div>
                      <div className="w-3.5 h-3.5 rounded-full border border-citrouille/60 flex items-center justify-center bg-manoir-800">
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-citrouille transition-transform duration-75"
                          style={{
                            transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={`p-2 rounded-full transition-colors duration-300 ${
                      isFound
                        ? 'bg-citrouille/25 text-citrouille border border-citrouille/40'
                        : 'bg-manoir-700 text-fantome/40 group-hover:text-citrouille group-hover:bg-manoir-700/80'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg text-fantome-pure font-medium flex items-center gap-2">
                    {relic.name}
                    {isFound && <Sparkles className="w-3.5 h-3.5 text-citrouille" />}
                  </h3>
                  <p className="font-sans text-xs text-fantome-dim/80 font-light line-clamp-2 leading-relaxed">
                    {isFound ? relic.lore : relic.hint}
                  </p>
                </div>

                <div className="text-[11px] font-sans text-citrouille/75 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-200">
                  <span>{isFound ? 'Examiner les détails' : 'Inspecter la relique'}</span>
                  <span>&rarr;</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Modal d inspection detaillee d une relique */}
      {selectedRelic && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-manoir-900/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedRelic(null)}
        >
          <div
            className="relative max-w-md w-full bg-manoir-800 border border-citrouille/40 rounded-2xl p-7 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedRelic(null)}
              className="absolute top-4 right-4 p-2 text-fantome/50 hover:text-fantome-pure transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-citrouille">
                {selectedRelic.room}
              </span>
              <h3 className="font-serif text-2xl text-fantome-pure font-normal">
                {selectedRelic.name}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-manoir-900/70 border border-citrouille/20 space-y-3">
              <p className="font-sans text-xs text-citrouille/90 font-mono">
                Extrait des Chroniques de Blackwood :
              </p>
              <blockquote className="font-serif italic text-sm text-fantome-pure/90 leading-relaxed border-l-2 border-citrouille/50 pl-3">
                « {selectedRelic.lore} »
              </blockquote>
            </div>

            <p className="font-sans text-xs text-fantome-dim font-light leading-relaxed">
              {selectedRelic.hint}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRelic(null)}
                className="px-5 py-2 rounded-xl bg-citrouille text-manoir-900 font-sans text-xs font-semibold tracking-wide hover:bg-citrouille/90 transition-all duration-200"
              >
                Poursuivre la quête
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
