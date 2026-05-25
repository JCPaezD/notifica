import { Capacitor } from '@capacitor/core'
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'

export type JsonExportResult = 'native-share' | 'web-download'
export type TextShareResult = 'native-share' | 'web-share' | 'clipboard' | 'unsupported' | 'cancelled'

export function isNativePlatform() {
  return Capacitor.isNativePlatform()
}

export async function exportJsonBackup(options: {
  fileName: string
  data: string
  title: string
  text: string
}): Promise<JsonExportResult> {
  if (isNativePlatform()) {
    await Filesystem.writeFile({
      path: options.fileName,
      data: options.data,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
    })

    const fileUri = await Filesystem.getUri({
      path: options.fileName,
      directory: Directory.Cache,
    })

    await Share.share({
      title: options.title,
      text: options.text,
      files: [fileUri.uri],
      dialogTitle: options.title,
    })

    return 'native-share'
  }

  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(options.data)
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', options.fileName)
  linkElement.click()

  return 'web-download'
}

export async function sharePlainText(options: {
  nativeTitle: string
  webTitle: string
  dialogTitle: string
  text: string
}): Promise<TextShareResult> {
  try {
    const canShare = await Share.canShare()

    if (canShare.value) {
      await Share.share({
        title: options.nativeTitle,
        text: options.text,
        dialogTitle: options.dialogTitle,
      })
      return 'native-share'
    }
  } catch {
    console.warn('Capacitor Share no disponible o falló, se usará fallback web.')
  }

  try {
    if (navigator.share) {
      await navigator.share({
        title: options.webTitle,
        text: options.text,
      })
      return 'web-share'
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(options.text)
      return 'clipboard'
    }

    return 'unsupported'
  } catch {
    return 'cancelled'
  }
}
