import { Eye, BookOpen, Clock, Compass, Key } from 'lucide-react'

export function Act2Mansion({ foundObjects = [], onFindObject }) {
  const objects = [
    {
      id: 'portrait',
      name: 'Le Portrait Ancestral',
      room: 'Le Grand Escalier',
      icon: Eye,
      hint: 'Un regard peint a l huile qui semble observer chaque mouvement.',
    },
    {
      id: 'grimoire',
      name: 'Le Grimoire sans Fin',
      room: 'La Bibliotheque Poussiereuse',
      icon: BookOpen,
      hint: 'Une page jaunie arretee sur une incantation oubliee.',
    },
    {
      id: 'horloge',
      name: 'L Horloge Fige',
      room: 'Le Salon des Glaces',
      icon: Clock,
      hint: 'Ses aiguilles d airain se sont bloquees a minuit precis.',
    },
    {
      id: 'boussole',
      name: 'La Boussole Devoyee',
      room: 'L Observatoire Sombre',
      icon: Compass,
      hint: 'L aiguille d argent pointe vers une direction inconnue.',
    },
    {
      id: 'cle',
      name: 'La Clef d Os',
      room: 'L Antichambre Fermee',
      icon: Key,
      hint: 'Taillee dans une matiere inconnue, tiede au toucher.',
    },
  ]

  const total = objects.length
  const foundCount = foundObjects.length

  return (
    <section
      id="acte-2"
      aria-labelledby="title-acte-2"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <header className="text-center space-y-4 max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-citrouille font-sans font-medium">
            Acte II &bull; L Exploration
          </p>
          <h2
            id="title-acte-2"
            className="font-serif text-4xl md:text-5xl font-normal text-fantome-pure"
          >
            Le Hall et la Bibliotheque
          </h2>
          <p className="font-sans text-sm text-fantome-dim font-light leading-relaxed">
            Balayez les coins d ombre avec votre lampe torche pour reveler les 5 reliques disséminées dans les pieces.
          </p>

          {/* Compteur discret */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-abysse/60 border border-citrouille/30 text-xs font-mono text-fantome-pure">
            <span className="text-citrouille font-semibold">{foundCount} / {total}</span>
            <span>reliques decouvertes</span>
          </div>
        </header>

        {/* Grille d exploration des objets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {objects.map((obj) => {
            const Icon = obj.icon
            const isFound = foundObjects.includes(obj.id)

            return (
              <button
                key={obj.id}
                type="button"
                onClick={() => onFindObject && onFindObject(obj.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 group flex flex-col justify-between h-44 backdrop-blur-sm ${
                  isFound
                    ? 'bg-abysse/80 border-citrouille/50 shadow-[0_0_20px_rgba(255,106,26,0.15)]'
                    : 'bg-manoir-800/60 border-fantome/10 hover:border-citrouille/30 hover:bg-manoir-800/80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono tracking-wider text-citrouille uppercase">
                    {obj.room}
                  </span>
                  <div className={`p-2 rounded-full ${isFound ? 'bg-citrouille/20 text-citrouille' : 'bg-manoir-700 text-fantome/40'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-fantome-pure font-medium">
                    {obj.name}
                  </h3>
                  <p className="font-sans text-xs text-fantome-dim/80 font-light mt-1">
                    {isFound ? 'Relique examinee & memorisee.' : obj.hint}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
