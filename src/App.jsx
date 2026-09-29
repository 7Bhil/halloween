import { useState, useEffect } from 'react'
import { useLenisScroll } from './hooks/useLenisScroll'
import { MansionScene } from './components/canvas/MansionScene'
import { SoundToggle } from './components/common/SoundToggle'
import { ActIndicator } from './components/common/ActIndicator'
import { Act1Gate } from './components/sections/Act1Gate'
import { Act2Mansion } from './components/sections/Act2Mansion'
import { Act3Mirror } from './components/sections/Act3Mirror'
import { Act4Pumpkin } from './components/sections/Act4Pumpkin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function App() {
  const { scrollTo } = useLenisScroll()
  const [currentAct, setCurrentAct] = useState(1)
  const [torchActive, setTorchActive] = useState(false)
  const [isPlayingSound, setIsPlayingSound] = useState(false)
  const [foundObjects, setFoundObjects] = useState([])
  const [monsterResult, setMonsterResult] = useState(null)

  // Suivi de l acte actif au scroll avec ScrollTrigger
  useEffect(() => {
    const sections = ['#acte-1', '#acte-2', '#acte-3', '#acte-4']
    const triggers = sections.map((sel, idx) => {
      return ScrollTrigger.create({
        trigger: sel,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => setCurrentAct(idx + 1),
        onEnterBack: () => setCurrentAct(idx + 1),
      })
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  const handleEnter = () => {
    setTorchActive(true)
    setIsPlayingSound(true)
    scrollTo('#acte-2', { duration: 1.6 })
  }

  const handleFindObject = (id) => {
    if (!foundObjects.includes(id)) {
      setFoundObjects((prev) => [...prev, id])
    }
  }

  const handleCompleteQuiz = (type) => {
    setMonsterResult(type)
    scrollTo('#acte-4', { duration: 1.6 })
  }

  const handleDownloadCard = () => {
    alert('L export de la carte sera integre a l etape 5.')
  }

  const handleShareLink = () => {
    navigator.clipboard?.writeText?.(window.location.href)
  }

  return (
    <div className="relative min-h-screen bg-manoir-900 text-fantome font-sans selection:bg-citrouille selection:text-manoir-900">
      {/* Scene 3D WebGL (Architecture, Brume, Eclairage 3D et Shader de lampe torche) */}
      <MansionScene currentAct={currentAct} torchActive={torchActive} />

      {/* Bouton de son discret */}
      <SoundToggle
        isPlaying={isPlayingSound}
        onToggle={() => setIsPlayingSound((p) => !p)}
      />

      {/* Indicateur de progression des 4 actes */}
      <ActIndicator activeAct={currentAct} totalActs={4} />

      {/* Parcours scrollytelling en 4 Actes */}
      <main className="relative z-10">
        <Act1Gate onEnter={handleEnter} torchActive={torchActive} />
        <Act2Mansion
          foundObjects={foundObjects}
          onFindObject={handleFindObject}
        />
        <Act3Mirror
          onCompleteQuiz={handleCompleteQuiz}
          monsterResult={monsterResult}
        />
        <Act4Pumpkin
          onDownloadCard={handleDownloadCard}
          onShareLink={handleShareLink}
        />
      </main>
    </div>
  )
}
