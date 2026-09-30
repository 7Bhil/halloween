import { useState } from 'react'
import { Sparkles, HelpCircle, ArrowRight, RotateCcw, Skull, Moon, Ghost, Sparkle, Flame } from 'lucide-react'
import { mansionAudio } from '../../utils/mansionAudio'

const QUESTIONS = [
  {
    q: 'Une lourde porte de chêne s entrebâille sans un souffle d air. Quel est votre premier geste ?',
    options: [
      { text: 'Je glisse à travers sans faire vibrer l air ni effleurer le bois.', type: 'fantome' },
      { text: 'J attends patiemment dans la pénombre que quelqu un ose s approcher.', type: 'vampire' },
      { text: 'Je trace un glyphe de bannissement protecteur sur le linteau.', type: 'sorciere' },
      { text: 'Je bondis en avant tous sens en éveil, prêt à déchiqueter l inconnu.', type: 'loup-garou' },
      { text: 'Je demeure impassible, car les siècles m ont appris la patience des pierres.', type: 'momie' },
    ],
  },
  {
    q: 'Quelle odeur réveille en vous la nuit d Halloween ?',
    options: [
      { text: 'Le parfum doux et enivrant de la cire de bougie et du velours pourpre.', type: 'vampire' },
      { text: 'La vapeur de sauge séchée, de racines amères et d écorces brûlées.', type: 'sorciere' },
      { text: 'La terre humide, la mousse froissée et la chair de la proie.', type: 'loup-garou' },
      { text: 'L encens froid d une crypte inviolée et les bandelettes de lin séché.', type: 'momie' },
      { text: 'Le froid absolu du givre qui pétrifie le souffle dans la gorge.', type: 'fantome' },
    ],
  },
  {
    q: 'Sous quel astre ou lueur préférez-vous parcourir le manoir ?',
    options: [
      { text: 'La pleine lune éclatante perçant les nuages déchiquetés.', type: 'loup-garou' },
      { text: 'L obscurité totale, guidé par la seule mémoire des couloirs anciens.', type: 'momie' },
      { text: 'Une étincelle bleue qui flotte sans chaleur au-dessus de ma paume.', type: 'sorciere' },
      { text: 'La clarté pâle et vaporeuse qui traverse les vitraux gothiques.', type: 'fantome' },
      { text: 'Le rougeoiement vacillant d un candélabre en argent terni.', type: 'vampire' },
    ],
  },
  {
    q: 'Quelle sentence graveriez-vous sur votre propre pierre tombale ?',
    options: [
      { text: '« Même la mort n a pu éteindre ma volonté séculaire. »', type: 'momie' },
      { text: '« Je ne suis pas parti, j habite désormais chaque souffle de vent. »', type: 'fantome' },
      { text: '« L immortalité est une élégante tragédie que je savoure chaque nuit. »', type: 'vampire' },
      { text: '« Les secrets de l abysse m ont donné le pouvoir de commander aux astres. »', type: 'sorciere' },
      { text: '« Sauvage et libre, aucune cage n a su retenir mes crocs. »', type: 'loup-garou' },
    ],
  },
  {
    q: 'Face à un intrus égaré dans le domaine, que lui réservez-vous ?',
    options: [
      { text: 'Un charme d illusion qui le fera tourner en rond jusqu au premier rayon.', type: 'sorciere' },
      { text: 'Une traque effrénée dans les sous-bois où résonne mon hurlement.', type: 'loup-garou' },
      { text: 'Le sceller dans une chambre close pour l éternité des sables.', type: 'momie' },
      { text: 'L inviter à partager un calice de vin pourpre avant de lui ravir son souffle.', type: 'vampire' },
      { text: 'Un souffle glacé dans sa nuque pour lui rappeler qu il n est jamais seul.', type: 'fantome' },
    ],
  },
]

const MONSTER_LORE = {
  fantome: {
    title: 'L Âme Errante',
    quote: 'Invisible aux yeux profanes, vous traversez les murs et les époques sans laisser d ombre.',
    icon: Ghost,
    color: '#e9e4d0',
    affinity: 'Éther & Souvenir',
  },
  vampire: {
    title: 'Le Seigneur Éternel',
    quote: 'Aristocrate de la nuit, le temps glisse sur vous sans jamais éroder votre élégance prédatrice.',
    icon: Moon,
    color: '#ff4d4d',
    affinity: 'Sang & Cire noire',
  },
  sorciere: {
    title: 'L Invocatrice des Ombres',
    quote: 'Vous entendez les murmures des racines et pliez les lois occultes à votre volonté.',
    icon: Sparkle,
    color: '#b066ff',
    affinity: 'Glyphes & Arcanes',
  },
  'loup-garou': {
    title: 'La Bête de Pleine Lune',
    quote: 'L instinct sauvage pulse dans vos veines, indomptable et guidé par le cycle des astres.',
    icon: Flame,
    color: '#ff6a1a',
    affinity: 'Instinct & Forêt sombre',
  },
  momie: {
    title: 'Le Gardien des Sarcophages',
    quote: 'Baigné dans le sel et le bitume sacré, votre veille transcende les dynasties oubliées.',
    icon: Skull,
    color: '#c9b037',
    affinity: 'Sables & Éternité',
  },
}

export function Act3Mirror({ onCompleteQuiz, monsterResult }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [activeMonster, setActiveMonster] = useState(() => monsterResult || null)

  const handleSelectOption = (type) => {
    mansionAudio.playRelicFound()
    const nextAnswers = [...answers, type]
    setAnswers(nextAnswers)

    if (currentQuestion + 1 < QUESTIONS.length) {
      setCurrentQuestion((c) => c + 1)
    } else {
      // Calcul du monstre majoritaire
      const counts = {}
      nextAnswers.forEach((ans) => {
        counts[ans] = (counts[ans] || 0) + 1
      })

      let winner = 'fantome'
      let maxCount = 0
      Object.entries(counts).forEach(([m, count]) => {
        if (count > maxCount) {
          maxCount = count
          winner = m
        }
      })

      setActiveMonster(winner)
      onCompleteQuiz?.(winner)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setActiveMonster(null)
  }

  const monsterData = activeMonster ? MONSTER_LORE[activeMonster] : null
  const MonsterIcon = monsterData?.icon || Ghost

  return (
    <section
      id="acte-3"
      aria-labelledby="title-acte-3"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-2xl mx-auto w-full space-y-12">
        <header className="text-center space-y-4 max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-citrouille font-sans font-medium">
            Acte III &bull; L Épreuve du Reflet
          </p>
          <h2
            id="title-acte-3"
            className="font-serif text-4xl md:text-5xl font-normal text-fantome-pure"
          >
            Le Miroir des Âmes
          </h2>
          <p className="font-sans text-sm text-fantome-dim font-light leading-relaxed">
            Le verre sombre ne renvoie pas votre apparence mortelle, mais la créature qui veille tapie au creux de votre esprit.
          </p>
        </header>

        {/* Cadre du miroir gothique */}
        <div className="relative p-7 md:p-10 rounded-3xl bg-abysse/60 border border-citrouille/30 backdrop-blur-md shadow-2xl text-center space-y-7 overflow-hidden">
          {/* Lueur intérieure du miroir */}
          <div className="absolute inset-0 bg-gradient-to-b from-citrouille/5 via-transparent to-abysse/40 pointer-events-none" />

          {!activeMonster ? (
            // Quiz interactif en 5 questions
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between text-xs font-mono text-citrouille border-b border-fantome/10 pb-3">
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" /> Question {currentQuestion + 1} sur {QUESTIONS.length}
                </span>
                <span className="text-fantome/50">
                  {Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%
                </span>
              </div>

              {/* Barre de progression subtile */}
              <div className="w-full bg-manoir-900 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-citrouille h-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <p className="font-serif text-xl md:text-2xl text-fantome-pure font-normal leading-relaxed text-left pt-2">
                « {QUESTIONS[currentQuestion].q} »
              </p>

              <div className="space-y-2.5 pt-2 text-left">
                {QUESTIONS[currentQuestion].options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(opt.type)}
                    className="w-full p-4 rounded-xl bg-manoir-900/80 border border-fantome/10 hover:border-citrouille/50 hover:bg-manoir-800/90 text-xs md:text-sm text-fantome-dim hover:text-fantome-pure transition-all duration-200 text-left font-sans font-light flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-citrouille opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Résultat du reflet spectral dans le miroir
            <div className="space-y-6 relative z-10 py-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-citrouille/10 border border-citrouille/30 text-[11px] font-mono uppercase tracking-wider text-citrouille">
                <Sparkles className="w-3.5 h-3.5" /> Reflet Révélé
              </div>

              {/* Effet visuel du monstre révélé dans le miroir */}
              <div className="w-24 h-24 mx-auto rounded-full bg-manoir-900 border-2 border-citrouille/60 flex items-center justify-center shadow-[0_0_35px_rgba(255,106,26,0.3)] animate-pulse">
                <MonsterIcon className="w-12 h-12 text-citrouille" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl md:text-4xl text-fantome-pure font-normal">
                  {monsterData.title}
                </h3>
                <span className="text-xs font-mono uppercase tracking-widest text-citrouille/80">
                  Affinité : {monsterData.affinity}
                </span>
              </div>

              <blockquote className="font-serif italic text-base md:text-lg text-fantome-pure/90 max-w-lg mx-auto leading-relaxed border-y border-citrouille/20 py-4">
                « {monsterData.quote} »
              </blockquote>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-manoir-900/80 border border-fantome/20 text-fantome/70 hover:text-fantome hover:border-citrouille/40 text-xs font-sans transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recommencer le rituel</span>
                </button>

                <a
                  href="#acte-4"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-citrouille hover:bg-citrouille-light text-manoir-900 text-xs font-sans uppercase tracking-wider font-semibold shadow-lg shadow-citrouille/20 transition-all"
                >
                  <span>Passer à l offrande de la citrouille</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
