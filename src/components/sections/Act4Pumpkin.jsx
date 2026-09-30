import { useState, useEffect } from 'react'
import { Sparkles, Download, Share2, Flame, RefreshCw, Check, ArrowRight, User } from 'lucide-react'
import { PumpkinCanvas } from '../canvas/PumpkinCanvas'
import { mansionAudio } from '../../utils/mansionAudio'

const EYE_OPTIONS = [
  { id: 'triangles', label: 'Triangles classiques' },
  { id: 'menacing', label: 'Regard menaçant' },
  { id: 'crescent', label: 'Croissants de lune' },
  { id: 'round', label: 'Globes exorbités' },
]

const NOSE_OPTIONS = [
  { id: 'triangle', label: 'Pointe classique' },
  { id: 'inverted', label: 'Inversé' },
  { id: 'skull', label: 'Cavité de crâne' },
]

const MOUTH_OPTIONS = [
  { id: 'smile', label: 'Dents acérées' },
  { id: 'vampire', label: 'Crocs de vampire' },
  { id: 'stitched', label: 'Lèvres suturées' },
  { id: 'scream', label: 'Cri d effroi' },
]

const STORAGE_KEY_PUMPKIN = 'halloween_mansion_pumpkin_2026'

export function Act4Pumpkin({
  onDownloadCard,
  onShareLink,
  pumpkinConfig,
  onChangePumpkin,
  isSharedView = false,
  onSwitchToMyPumpkin,
}) {
  const [eyes, setEyes] = useState(() => pumpkinConfig?.eyes || 'triangles')
  const [nose, setNose] = useState(() => pumpkinConfig?.nose || 'triangle')
  const [mouth, setMouth] = useState(() => pumpkinConfig?.mouth || 'smile')
  const [message, setMessage] = useState(() => pumpkinConfig?.message || 'Que la nuit veille sur nous...')
  const [isLit, setIsLit] = useState(true)
  const [flicker, setFlicker] = useState(1.0)
  const [copiedNotification, setCopiedNotification] = useState(false)

  // Met à jour l'état si les props externes changent (ex: partage d'URL)
  useEffect(() => {
    if (pumpkinConfig) {
      setEyes(pumpkinConfig.eyes || 'triangles')
      setNose(pumpkinConfig.nose || 'triangle')
      setMouth(pumpkinConfig.mouth || 'smile')
      setMessage(pumpkinConfig.message || 'Que la nuit veille sur nous...')
    }
  }, [pumpkinConfig])

  // Vacillement de la flamme intérieure
  useEffect(() => {
    if (!isLit) return
    const interval = setInterval(() => {
      setFlicker(0.85 + Math.random() * 0.3)
    }, 120)
    return () => clearInterval(interval)
  }, [isLit])

  // Synchronisation avec les props et le localStorage (uniquement hors mode visiteur)
  useEffect(() => {
    if (isSharedView) return
    const config = { eyes, nose, mouth, message }
    onChangePumpkin?.(config)
    try {
      localStorage.setItem(STORAGE_KEY_PUMPKIN, JSON.stringify(config))
    } catch {
      // Ignorer erreurs de quota
    }
  }, [eyes, nose, mouth, message, isSharedView, onChangePumpkin])

  const handleRandomize = () => {
    if (isSharedView) return
    const randomEye = EYE_OPTIONS[Math.floor(Math.random() * EYE_OPTIONS.length)].id
    const randomNose = NOSE_OPTIONS[Math.floor(Math.random() * NOSE_OPTIONS.length)].id
    const randomMouth = MOUTH_OPTIONS[Math.floor(Math.random() * MOUTH_OPTIONS.length)].id
    setEyes(randomEye)
    setNose(randomNose)
    setMouth(randomMouth)
    mansionAudio.playRelicFound()
  }

  const handleToggleLight = () => {
    setIsLit((prev) => !prev)
    mansionAudio.playRelicFound()
  }

  const handleShareClick = () => {
    onShareLink?.()
    setCopiedNotification(true)
    setTimeout(() => setCopiedNotification(false), 2400)
  }

  return (
    <section
      id="acte-4"
      aria-labelledby="title-acte-4"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <header className="space-y-4 text-center max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-citrouille font-sans font-medium">
            Acte IV &bull; L Offrande des Ténèbres
          </p>
          <h2
            id="title-acte-4"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-fantome-pure"
          >
            {isSharedView ? 'Une Citrouille Reçue' : 'La Citrouille des Ombres'}
          </h2>
          <p className="font-sans text-sm text-fantome-dim font-light leading-relaxed">
            {isSharedView
              ? 'Un voyageur de la nuit vous a transmis son offrande scellée dans les ténèbres.'
              : 'Sculptez votre citrouille rituelle, insufflez-lui une lueur vacillante et gravez votre serment protecteur avant l aube.'}
          </p>

          {/* Bandeau d'information si en mode partage lecture seule */}
          {isSharedView && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-citrouille/15 border border-citrouille/40 text-xs font-sans text-citrouille-light">
              <User className="w-4 h-4 text-citrouille" />
              <span>Vous admirez l offrande sculptée d un autre visiteur.</span>
              <button
                type="button"
                onClick={onSwitchToMyPumpkin}
                className="underline underline-offset-2 ml-2 font-medium hover:text-white"
              >
                Sculpter la mienne &rarr;
              </button>
            </div>
          )}
        </header>

        {/* Studio de sculpture interactif */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-abysse/55 border border-fantome/15 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl">
          {/* Aperçu dynamique en Canvas 2D */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 relative">
            <div className="relative flex items-center justify-center p-4 rounded-2xl bg-manoir-900/60 border border-fantome/10 w-full overflow-hidden">
              <PumpkinCanvas
                eyes={eyes}
                nose={nose}
                mouth={mouth}
                isLit={isLit}
                flicker={flicker}
              />
            </div>

            {/* Contrôles sous la citrouille */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleLight}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-200 border ${
                  isLit
                    ? 'bg-citrouille/20 border-citrouille/50 text-citrouille'
                    : 'bg-manoir-800 border-fantome/20 text-fantome/60 hover:text-fantome'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${isLit ? 'animate-pulse text-citrouille' : ''}`} />
                <span>{isLit ? 'Flamme ardente' : 'Éteindre'}</span>
              </button>

              {!isSharedView && (
                <button
                  type="button"
                  onClick={handleRandomize}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans bg-manoir-800 border border-fantome/20 text-fantome-dim hover:text-fantome-pure hover:border-citrouille/40 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Aléatoire</span>
                </button>
              )}
            </div>
          </div>

          {/* Panneau de configuration (actif ou lecture seule) */}
          <div className="lg:col-span-7 space-y-6">
            {isSharedView ? (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-manoir-900/80 border border-citrouille/30 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-citrouille">
                    Serment scellé sur la citrouille
                  </span>
                  <p className="font-serif italic text-xl text-fantome-pure">
                    « {message || 'Que la nuit veille sur nous...'} »
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={onSwitchToMyPumpkin}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-citrouille text-manoir-900 font-sans text-xs tracking-wider uppercase font-semibold shadow-lg shadow-citrouille/20 hover:bg-citrouille-light transition-all"
                  >
                    <span>Sculpter ma propre citrouille</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={onDownloadCard}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-fantome/10 hover:bg-fantome/20 text-fantome-pure font-sans text-xs tracking-wider uppercase font-medium border border-fantome/20 transition-all"
                  >
                    <Download className="w-4 h-4 text-citrouille" />
                    <span>Télécharger la carte</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Choix des yeux */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-citrouille">
                    1. Les Yeux
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {EYE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setEyes(opt.id)
                          mansionAudio.playRelicFound()
                        }}
                        className={`px-3 py-2 rounded-xl text-left text-xs font-sans border transition-all duration-200 ${
                          eyes === opt.id
                            ? 'bg-citrouille/20 border-citrouille text-citrouille-light font-medium shadow-sm'
                            : 'bg-manoir-800/80 border-fantome/10 text-fantome-dim hover:border-citrouille/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Choix du nez */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-citrouille">
                    2. Le Nez
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {NOSE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setNose(opt.id)
                          mansionAudio.playRelicFound()
                        }}
                        className={`px-3 py-2 rounded-xl text-left text-xs font-sans border transition-all duration-200 ${
                          nose === opt.id
                            ? 'bg-citrouille/20 border-citrouille text-citrouille-light font-medium shadow-sm'
                            : 'bg-manoir-800/80 border-fantome/10 text-fantome-dim hover:border-citrouille/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Choix de la bouche */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-citrouille">
                    3. La Bouche
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {MOUTH_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setMouth(opt.id)
                          mansionAudio.playRelicFound()
                        }}
                        className={`px-3 py-2 rounded-xl text-left text-xs font-sans border transition-all duration-200 ${
                          mouth === opt.id
                            ? 'bg-citrouille/20 border-citrouille text-citrouille-light font-medium shadow-sm'
                            : 'bg-manoir-800/80 border-fantome/10 text-fantome-dim hover:border-citrouille/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message gravé (40 car max) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono text-fantome/70">
                    <label htmlFor="pumpkin-serment">4. Serment gravé sur l écorce</label>
                    <span>{message.length} / 40</span>
                  </div>
                  <input
                    id="pumpkin-serment"
                    type="text"
                    maxLength={40}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Que la nuit veille sur nous..."
                    className="w-full px-4 py-2.5 rounded-xl bg-manoir-900/90 border border-fantome/20 text-fantome-pure placeholder:text-fantome/30 text-sm focus:outline-none focus:border-citrouille focus:ring-1 focus:ring-citrouille transition-all"
                  />
                </div>

                {/* Actions de partage et téléchargement */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-fantome/10">
                  <button
                    type="button"
                    onClick={onDownloadCard}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fantome/10 hover:bg-fantome/20 text-fantome-pure font-sans text-xs tracking-wider uppercase font-medium border border-fantome/20 transition-all duration-300"
                  >
                    <Download className="w-4 h-4 text-citrouille" />
                    <span>Télécharger ma carte</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareClick}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-citrouille hover:bg-citrouille-light text-manoir-900 font-sans text-xs tracking-wider uppercase font-semibold shadow-lg shadow-citrouille/20 transition-all duration-300"
                  >
                    {copiedNotification ? (
                      <>
                        <Check className="w-4 h-4 text-manoir-900" />
                        <span>Lien copié</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-manoir-900" />
                        <span>Copier mon lien</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
