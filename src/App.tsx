import { useEffect } from 'react'
import { Landing } from './pages/Landing'
import { useStore } from './store/useStore'
import { useAmbientSound } from './hooks/useAmbientSound'
import { isLowPowerDevice } from './utils/webgl'

export default function App() {
  const setQuality = useStore((s) => s.setQuality)
  useAmbientSound()

  // Auto-drop graphics quality on low-power / mobile devices.
  useEffect(() => {
    if (isLowPowerDevice()) setQuality('low')
  }, [setQuality])

  return <Landing />
}
