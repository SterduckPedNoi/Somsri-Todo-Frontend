let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

let muted = false

export const soundService = {
  isMuted() {
    return muted
  },
  toggleMute() {
    muted = !muted
    return muted
  },

  playKeyStroke(key?: string) {
    if (muted) return
    try {
      const ctx = getAudioContext()
      if (!ctx) return

      const now = ctx.currentTime
      const pitchVariance = 1 + (Math.random() * 0.16 - 0.08)

      if (key === ' ' || key === 'Space') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(140 * pitchVariance, now)
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.05)

        gain.gain.setValueAtTime(0.12, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.05)
        return
      }

      if (key === 'Enter') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'square'
        osc.frequency.setValueAtTime(260 * pitchVariance, now)
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.07)

        gain.gain.setValueAtTime(0.14, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.07)
        return
      }

      const bufferSize = Math.floor(ctx.sampleRate * 0.02)
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2))
      }

      const noiseSource = ctx.createBufferSource()
      noiseSource.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = (key === 'Backspace' ? 3200 : 2600) * pitchVariance
      filter.Q.value = 3.5

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.1, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

      noiseSource.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(ctx.destination)

      noiseSource.start(now)

      const thudOsc = ctx.createOscillator()
      const thudGain = ctx.createGain()
      thudOsc.type = 'triangle'
      thudOsc.frequency.setValueAtTime(220 * pitchVariance, now)
      thudOsc.frequency.exponentialRampToValueAtTime(70, now + 0.035)

      thudGain.gain.setValueAtTime(0.09, now)
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035)

      thudOsc.connect(thudGain)
      thudGain.connect(ctx.destination)

      thudOsc.start(now)
      thudOsc.stop(now + 0.035)
    } catch {
    }
  },

  playCheck() {
    if (muted) return
    try {
      const ctx = getAudioContext()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(600, now)
      osc.frequency.linearRampToValueAtTime(950, now + 0.06)

      gain.gain.setValueAtTime(0.06, now)
      gain.gain.linearRampToValueAtTime(0.001, now + 0.07)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.07)
    } catch {
    }
  },

  playTear() {
    if (muted) return
    try {
      const ctx = getAudioContext()
      if (!ctx) return
      const bufferSize = ctx.sampleRate * 0.06
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3))
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 1400

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.06)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      noise.start()
    } catch {
    }
  },
}
