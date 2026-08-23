import { Capacitor, registerPlugin } from '@capacitor/core'

export interface KeepScreenOnPlugin {
  setEnabled(options: { enabled: boolean }): Promise<void>
}

export interface WebWakeLockSentinel {
  readonly released: boolean
  release(): Promise<void>
  addEventListener(type: 'release', listener: () => void): void
}

interface WebWakeLock {
  request(type: 'screen'): Promise<WebWakeLockSentinel>
}

export const KeepScreenOn = registerPlugin<KeepScreenOnPlugin>('KeepScreenOn')

export function isAndroidNativePlatform(): boolean {
  return Capacitor.getPlatform() === 'android'
}

export function getWebWakeLock(): WebWakeLock | undefined {
  return (navigator as Navigator & { wakeLock?: WebWakeLock }).wakeLock
}

export async function setNativeKeepScreenOn(enabled: boolean): Promise<void> {
  if (!isAndroidNativePlatform() || !Capacitor.isPluginAvailable('KeepScreenOn')) return

  try {
    await KeepScreenOn.setEnabled({ enabled })
  } catch (error) {
    // Native support is optional; the setting must remain harmless if unavailable.
    console.warn('[KeepScreenAwake] Native screen lock unavailable:', error)
  }
}
