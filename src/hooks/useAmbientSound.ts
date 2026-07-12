import { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'

/**
 * Electronic gym music synthesized live with the Web Audio API — no audio
 * files, works fully offline. A 126 BPM synthwave loop: four-on-the-floor
 * kick, off-beat hi-hats, a driving bass line and a neon arp lead.
 */

const BPM = 126
const STEP = 60 / BPM / 4 // 16th note duration (s)
const BARS = 2
const STEPS = 16 * BARS

// A-minor-ish patterns (frequencies in Hz).
const A1 = 55
const BASS: (number | 0)[] = [
  A1, 0, A1, 0, A1, 0, A1 * 1.5, 0, A1 * 1.189, 0, A1 * 1.189, 0, A1 * 1.335, 0, A1 * 1.5, 0,
  A1, 0, A1, 0, A1, 0, A1 * 1.5, 0, A1 * 0.891, 0, A1 * 0.891, 0, A1 * 1.189, 0, A1 * 1.335, 0,
]
const ARP: (number | 0)[] = [
  440, 0, 523.25, 659.25, 0, 440, 0, 659.25, 587.33, 0, 523.25, 0, 440, 0, 392, 0,
  440, 0, 523.25, 659.25, 0, 880, 0, 659.25, 587.33, 0, 523.25, 0, 587.33, 0, 659.25, 0,
]

interface Engine {
  ctx: AudioContext
  master: GainNode
  timer: number
}

function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return buffer
}

function startEngine(): Engine {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const ctx = new AC()

  const master = ctx.createGain()
  master.gain.value = 0
  const comp = ctx.createDynamicsCompressor()
  master.connect(comp)
  comp.connect(ctx.destination)

  const noise = createNoiseBuffer(ctx)

  const kick = (t: number) => {
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(150, t)
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.12)
    g.gain.setValueAtTime(0.9, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.28)
    osc.connect(g).connect(master)
    osc.start(t)
    osc.stop(t + 0.3)
  }

  const hat = (t: number, open = false) => {
    const src = ctx.createBufferSource()
    src.buffer = noise
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 8000
    const g = ctx.createGain()
    const dur = open ? 0.12 : 0.045
    g.gain.setValueAtTime(0.18, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + dur)
    src.connect(hp).connect(g).connect(master)
    src.start(t)
    src.stop(t + dur + 0.01)
  }

  const bass = (t: number, freq: number) => {
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = freq
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(700, t)
    lp.frequency.exponentialRampToValueAtTime(180, t + STEP * 1.6)
    lp.Q.value = 6
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.32, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + STEP * 1.8)
    osc.connect(lp).connect(g).connect(master)
    osc.start(t)
    osc.stop(t + STEP * 2)
  }

  const arp = (t: number, freq: number) => {
    const osc = ctx.createOscillator()
    osc.type = 'square'
    osc.frequency.value = freq
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 2200
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.06, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + STEP * 1.4)
    // Simple stereo echo for the neon feel.
    const delay = ctx.createDelay()
    delay.delayTime.value = STEP * 3
    const fb = ctx.createGain()
    fb.gain.value = 0.3
    osc.connect(lp).connect(g)
    g.connect(master)
    g.connect(delay)
    delay.connect(fb).connect(delay)
    delay.connect(master)
    osc.start(t)
    osc.stop(t + STEP * 1.5)
  }

  // Lookahead scheduler.
  let step = 0
  let nextTime = ctx.currentTime + 0.1
  const timer = window.setInterval(() => {
    while (nextTime < ctx.currentTime + 0.25) {
      const s = step % STEPS
      if (s % 4 === 0) kick(nextTime)
      if (s % 4 === 2) hat(nextTime, s % 16 === 14)
      const b = BASS[s]
      if (b) bass(nextTime, b)
      const a = ARP[s]
      if (a) arp(nextTime, a)
      nextTime += STEP
      step++
    }
  }, 90)

  return { ctx, master, timer }
}

export function useAmbientSound() {
  const soundOn = useStore((s) => s.soundOn)
  const engineRef = useRef<Engine | null>(null)

  useEffect(() => {
    if (soundOn) {
      // Create lazily on first enable (must follow a user gesture).
      if (!engineRef.current) engineRef.current = startEngine()
      const { ctx, master } = engineRef.current
      ctx.resume()
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setTargetAtTime(0.5, ctx.currentTime, 0.5)
    } else if (engineRef.current) {
      const { ctx, master } = engineRef.current
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.25)
    }
  }, [soundOn])

  // Tear down on unmount.
  useEffect(
    () => () => {
      const e = engineRef.current
      if (e) {
        clearInterval(e.timer)
        void e.ctx.close()
      }
    },
    [],
  )
}
