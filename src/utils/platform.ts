import { Capacitor } from '@capacitor/core'
import { Device } from '@capacitor/device'

export const isAndroidApiAtLeast = async (minApi: number): Promise<boolean> => {
  if (Capacitor.getPlatform() !== 'android') return false

  try {
    const info = await Device.getInfo()
    const api = info.androidSDKVersion ?? 0
    return api >= minApi
  } catch (err) {
    console.warn('[Platform] No se pudo obtener el API de Android:', err)
    return false
  }
}
