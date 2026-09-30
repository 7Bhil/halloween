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
import { mansionAudio } from './utils/mansionAudio'
import { encodeSharePayload, decodeSharePayload } from './utils/shareEncoding'
import { generateHalloweenCard } from './utils/cardGenerator'

const STORAGE_KEY_RELICS = 'halloween_mansion_relics_2026'
const STORAGE_KEY_PUMPKIN = 'halloween_mansion_pumpkin_2026'

const DEFAULT_PUMPKIN = {
  eyes: 'triangles',
  nose: 'triangle',
  mouth: 'smile',
  message: 'Que la nuit veille sur nous...',
}

export default function App() {
  const { scrollTo } = useLenisScroll()
  const [currentAct, setCurrentAct] = useState(1)
  const [torchActive, setTorchActive] = useState(false)
  const [isPlayingSound, setIsPlayingSound] = useState(false)
  const [monsterResult, setMonsterResult] = useState(null)
  const [isSharedMode, setIsSharedMode] = useState(false)

  // Persistance localStorage des reliques découvertes
  const [foundObjects, setFoundObjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RELICS)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Configuration locale de la citrouille sculptée
  const [pumpkinConfig, setPumpkinConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PUMPKIN)
      return saved ? JSON.parse(saved) : DEFAULT_PUMPKIN
    } catch {
      return DEFAULT_PUMPKIN
    }
  })

  // Vérification de paramètre URL de partage ?c=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const shareParam = params.get('c')
    if (shareParam) {
      const decoded = decodeSharePayload(shareParam)
      if (decoded) {
        setIsSharedMode(true)
        setPumpkinConfig(decoded.pumpkin)
        if (decoded.monster) {
          setMonsterResult(decoded.monster)
        }
        // Ouvrir directement sur l'Acte 4 pour admirer la citrouille partagée
        setTimeout(() => {
          scrollTo('#acte-4', { duration: 1.2 })
        }, 400)
      }
    }
  }, [scrollTo])

  // Synchronisation du niveau de tension sonore selon les reliques
  useEffect(() => {
    mansionAudio.setTension(foundObjects.length)
    try {
      localStorage.setItem(STORAGE_KEY_RELICS, JSON.stringify(foundObjects))
    } catch {
      // Ignorer
    }
  }, [foundObjects])

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
    mansionAudio.start()
    mansionAudio.playDoorCreak()
    scrollTo('#acte-2', { duration: 1.6 })
  }

  const handleToggleSound = () => {
    const nextState = !isPlayingSound
    setIsPlayingSound(nextState)
    if (nextState) {
      mansionAudio.start()
    } else {
      mansionAudio.stop()
    }
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

  // Exportation de la carte 1080x1920 PNG
  const handleDownloadCard = () => {
    generateHalloweenCard({
      pumpkin: pumpkinConfig,
      monster: monsterResult,
    })
    mansionAudio.playRelicFound()
  }

  // Génération de l'URL de partage avec encodage base64 sécurisé
  const handleShareLink = () => {
    const payload = encodeSharePayload(pumpkinConfig, monsterResult)
    if (!payload) return
    const url = new URL(window.location.origin + window.location.pathname)
    url.searchParams.set('c', payload)
    navigator.clipboard?.writeText?.(url.toString())
  }

  // Basculer du mode visiteur vers ma propre citrouille
  const handleSwitchToMyPumpkin = () => {
    setIsSharedMode(false)
    window.history.replaceState({}, '', window.location.pathname)
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PUMPKIN)
      setPumpkinConfig(saved ? JSON.parse(saved) : DEFAULT_PUMPKIN)
    } catch {
      setPumpkinConfig(DEFAULT_PUMPKIN)
    }
  }

  return (
    <div className="relative min-h-screen bg-manoir-900 text-fantome font-sans selection:bg-citrouille selection:text-manoir-900">
      {/* Scène 3D WebGL (Architecture, Brume, Éclairage 3D et Shader de lampe torche) */}
      <MansionScene currentAct={currentAct} torchActive={torchActive} />

      {/* Bouton de son discret avec contrôle du moteur Web Audio */}
      <SoundToggle
        isPlaying={isPlayingSound}
        onToggle={handleToggleSound}
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
          pumpkinConfig={pumpkinConfig}
          onChangePumpkin={setPumpkinConfig}
          onDownloadCard={handleDownloadCard}
          onShareLink={handleShareLink}
          isSharedView={isSharedMode}
          onSwitchToMyPumpkin={handleSwitchToMyPumpkin}
        />
      </main>
    </div>
  )
}
