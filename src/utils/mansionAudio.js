/**
 * Moteur sonore immersif du Manoir des Ombres (Front-End pur, zéro dépendance réseau)
 * Synthétise en temps réel via la Web Audio API :
 * - Nappe d'ambiance nocturne sourde et chuchotements de vent
 * - Battement de cœur organique qui s'adapte au niveau de tension
 * - Bruits de craquement de plancher, tintements spectraux et grimoire
 */

class MansionSoundEngine {
  constructor() {
    this.ctx = null
    this.isPlaying = false
    this.masterGain = null
    this.ambientGain = null
    this.heartbeatGain = null
    this.heartbeatTimer = null
    this.heartRate = 1200 // ms entre deux battements
    this.tensionLevel = 0 // 0 a 5 selon les reliques
  }

  init() {
    if (this.ctx) return
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return

    this.ctx = new AudioContextClass()

    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)
    this.masterGain.connect(this.ctx.destination)

    this.setupAmbience()
  }

  setupAmbience() {
    if (!this.ctx) return

    // 1. Nappe basse fréquence spectrale (drone sombre)
    const droneOsc = this.ctx.createOscillator()
    const droneFilter = this.ctx.createBiquadFilter()
    const droneGain = this.ctx.createGain()

    droneOsc.type = 'sawtooth'
    droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime) // Note La très grave

    droneFilter.type = 'lowpass'
    droneFilter.frequency.setValueAtTime(110, this.ctx.currentTime)

    droneGain.gain.setValueAtTime(0.25, this.ctx.currentTime)

    droneOsc.connect(droneFilter)
    droneFilter.connect(droneGain)
    droneGain.connect(this.masterGain)
    droneOsc.start()

    // 2. Souffle de vent froid et feutré
    const bufferSize = this.ctx.sampleRate * 2
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    let lastOut = 0.0

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      output[i] = (lastOut + 0.02 * white) / 1.02
      lastOut = output[i]
      output[i] *= 0.12
    }

    const windSource = this.ctx.createBufferSource()
    windSource.buffer = noiseBuffer
    windSource.loop = true

    const windFilter = this.ctx.createBiquadFilter()
    windFilter.type = 'bandpass'
    windFilter.frequency.setValueAtTime(220, this.ctx.currentTime)
    windFilter.Q.setValueAtTime(3.0, this.ctx.currentTime)

    const windGain = this.ctx.createGain()
    windGain.gain.setValueAtTime(0.35, this.ctx.currentTime)

    windSource.connect(windFilter)
    windFilter.connect(windGain)
    windGain.connect(this.masterGain)
    windSource.start()
  }

  // Son de battement de cœur
  playHeartbeat() {
    if (!this.isPlaying || !this.ctx) return

    const now = this.ctx.currentTime
    // Premier coup sourd (systole)
    const osc1 = this.ctx.createOscillator()
    const gain1 = this.ctx.createGain()
    osc1.frequency.setValueAtTime(65, now)
    osc1.frequency.exponentialRampToValueAtTime(35, now + 0.12)
    gain1.gain.setValueAtTime(0.35, now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14)
    osc1.connect(gain1)
    gain1.connect(this.masterGain)
    osc1.start(now)
    osc1.stop(now + 0.15)

    // Second coup léger (diastole)
    const osc2 = this.ctx.createOscillator()
    const gain2 = this.ctx.createGain()
    const t2 = now + 0.16
    osc2.frequency.setValueAtTime(55, t2)
    osc2.frequency.exponentialRampToValueAtTime(30, t2 + 0.1)
    gain2.gain.setValueAtTime(0.2, t2)
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.12)
    osc2.connect(gain2)
    gain2.connect(this.masterGain)
    osc2.start(t2)
    osc2.stop(t2 + 0.14)

    // Planification du battement suivant selon la tension
    const interval = Math.max(650, 1300 - this.tensionLevel * 120)
    this.heartbeatTimer = setTimeout(() => this.playHeartbeat(), interval)
  }

  // Effet sonore lors de la découverte d'une relique
  playRelicFound() {
    if (!this.isPlaying || !this.ctx) return
    const now = this.ctx.currentTime

    // Tintement cristallin sombre et réverbéré
    const freqs = [330, 495, 660]
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(f, now + idx * 0.05)
      gain.gain.setValueAtTime(0.12, now + idx * 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.1)
      osc.connect(gain)
      gain.connect(this.masterGain)
      osc.start(now + idx * 0.05)
      osc.stop(now + 1.4 + idx * 0.1)
    })
  }

  // Effet de grincement d'une porte
  playDoorCreak() {
    if (!this.isPlaying || !this.ctx) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(120, now)
    osc.frequency.linearRampToValueAtTime(190, now + 0.4)
    osc.frequency.linearRampToValueAtTime(80, now + 0.8)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 0.95)
  }

  // Effet de souffle / chuchotement spectral pour le jump scare
  playScareWhisper() {
    if (!this.isPlaying || !this.ctx) return
    const now = this.ctx.currentTime

    // Coup de basse bref et sursaut d'air
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(90, now)
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.3)
    gain.gain.setValueAtTime(0.45, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 0.4)
  }

  setTension(relicsCount) {
    this.tensionLevel = relicsCount
  }

  start() {
    this.init()
    if (!this.ctx) return

    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    this.isPlaying = true
    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
    this.masterGain.gain.linearRampToValueAtTime(0.7, now + 1.5)

    this.playHeartbeat()
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return
    this.isPlaying = false

    if (this.heartbeatTimer) {
      clearTimeout(this.heartbeatTimer)
      this.heartbeatTimer = null
    }

    const now = this.ctx.currentTime
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8)
  }

  toggle() {
    if (this.isPlaying) {
      this.stop()
    } else {
      this.start()
    }
    return this.isPlaying
  }
}

export const mansionAudio = new MansionSoundEngine()
