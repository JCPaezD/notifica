import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  getWebWakeLock,
  isAndroidNativePlatform,
  setNativeKeepScreenOn,
  type WebWakeLockSentinel,
} from '@/adapters/keepScreenAwakeAdapter'

export const KEEP_SCREEN_AWAKE_STORAGE_KEY = 'keepScreenAwake'

const storedValue = localStorage.getItem(KEEP_SCREEN_AWAKE_STORAGE_KEY)

export function useKeepScreenAwake() {
  const keepScreenAwake = ref(storedValue === 'true')
  let webWakeLock: WebWakeLockSentinel | null = null
  let nativeLockEnabled = false
  let syncPromise: Promise<void> | null = null
  let syncRequested = false

  const releaseWebWakeLock = async () => {
    const wakeLock = webWakeLock
    webWakeLock = null

    if (wakeLock && !wakeLock.released) {
      try {
        await wakeLock.release()
      } catch (error) {
        console.warn('[KeepScreenAwake] Web screen lock release failed:', error)
      }
    }
  }

  const releaseNativeKeepScreenOn = async () => {
    if (!nativeLockEnabled) return

    nativeLockEnabled = false
    await setNativeKeepScreenOn(false)
  }

  const applyCurrentState = async () => {
    const shouldKeepScreenAwake = keepScreenAwake.value && document.visibilityState === 'visible'

    if (isAndroidNativePlatform()) {
      await releaseWebWakeLock()
      if (shouldKeepScreenAwake) {
        await setNativeKeepScreenOn(true)
        nativeLockEnabled = true
      } else {
        await releaseNativeKeepScreenOn()
      }
      return
    }

    await releaseNativeKeepScreenOn()

    if (!shouldKeepScreenAwake) {
      await releaseWebWakeLock()
      return
    }

    if (webWakeLock && !webWakeLock.released) return

    const wakeLock = getWebWakeLock()
    if (!wakeLock) return

    try {
      const nextWakeLock = await wakeLock.request('screen')
      webWakeLock = nextWakeLock
      nextWakeLock.addEventListener('release', () => {
        if (webWakeLock === nextWakeLock) webWakeLock = null
        if (keepScreenAwake.value && document.visibilityState === 'visible') requestSync()
      })
    } catch (error) {
      // Browsers may reject the request for policy, battery or support reasons.
      console.warn('[KeepScreenAwake] Web screen lock unavailable:', error)
    }
  }

  const sync = async () => {
    if (syncPromise) {
      syncRequested = true
      return syncPromise
    }

    syncPromise = (async () => {
      do {
        syncRequested = false
        await applyCurrentState()
      } while (syncRequested)
    })().finally(() => {
      syncPromise = null
    })

    return syncPromise
  }

  function requestSync() {
    syncRequested = true
    void sync()
  }

  function setKeepScreenAwake(enabled: boolean) {
    keepScreenAwake.value = enabled
  }

  const handleVisibilityChange = () => requestSync()

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    requestSync()
  })

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    void releaseWebWakeLock()
    void releaseNativeKeepScreenOn()
  })

  watch(keepScreenAwake, (enabled) => {
    localStorage.setItem(KEEP_SCREEN_AWAKE_STORAGE_KEY, String(enabled))
    requestSync()
  })

  return {
    keepScreenAwake,
    setKeepScreenAwake,
  }
}
