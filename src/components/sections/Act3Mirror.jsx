import { useState } from 'react'
import { Sparkles, HelpCircle } from 'lucide-react'

export function Act3Mirror({ onCompleteQuiz, monsterResult }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])

  const questions = [
    {
      q: 'Une lourde porte de chene s entrebaille sans un souffle. Que faites-vous ?',
      options: [
        { text: 'Je glisse a travers sans faire vibrer l air', type: 'fantome' },
        { text: 'J attends dans la penombre que quelqu un s approche', type: 'vampire' },
        { text: 'Je trace un glyphe protecteur sur le seuil', type: 'sorciere' },
        { text: 'Je pousse la porte d un coup sec pret a bondir', type: 'loup-garou' },
      ],
    },
    {
      q: 'Quel parfum evoque pour vous la nuit d Halloween ?',
      options: [
        { text: 'L encens froid d une crypte seculaire', type: 'momie' },
        { text: 'Le velours ancien impregne de cire chaude', type: 'vampire' },
        { text: 'L odeur de mousse humide et de terre retournee', type: 'loup-garou' },
        { text: 'La fumee de sauge sauvage et de racines sechees', type: 'sorciere' },
      ],
    },
  ]

  const handleSelectOption = (type) => {
    const nextAnswers = [...answers, type]
    setAnswers(nextAnswers)

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((c) => c + 1)
    } else {
      if (onCompleteQuiz) {
        onCompleteQuiz('fantome')
      }
    }
  }

  return (
    <section
      id="acte-3"
      aria-labelledby="title-acte-3"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-2xl mx-auto w-full space-y-12">
        <header className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-citrouille font-sans font-medium">
            Acte III &bull; L Epreuve du Reflet
          </p>
          <h2
            id="title-acte-3"
            className="font-serif text-4xl md:text-5xl font-normal text-fantome-pure"
          >
            Le Miroir des Ames
          </h2>
          <p className="font-sans text-sm text-fantome-dim font-light leading-relaxed max-w-lg mx-auto">
            Le verre sombre ne renvoie pas votre visage, mais la creature qui veille sous vos pas.
          </p>
        </header>

        {/* Cadre du miroir */}
        <div className="p-8 rounded-3xl bg-abysse/50 border border-fantome/15 backdrop-blur-md shadow-2xl text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-citrouille uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Question 0{currentQuestion + 1} / 0{questions.length}</span>
          </div>

          <p className="font-serif text-xl md:text-2xl text-fantome-pure font-light leading-relaxed">
            {questions[currentQuestion].q}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {questions[currentQuestion].options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectOption(opt.type)}
                className="p-4 rounded-xl bg-manoir-900/80 border border-fantome/10 hover:border-citrouille/40 hover:bg-manoir-800 text-xs text-fantome-dim hover:text-fantome-pure transition-all duration-300 text-left font-sans font-light"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
