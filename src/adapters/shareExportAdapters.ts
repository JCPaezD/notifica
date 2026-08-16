import { Capacitor } from '@capacitor/core'
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'

export type JsonExportResult = 'native-share' | 'web-share' | 'web-download' | 'cancelled'
export type TextShareResult = 'native-share' | 'web-share' | 'clipboard' | 'unsupported' | 'cancelled'

export function isNativePlatform() {
  return Capacitor.isNativePlatform()
}

function isAbortError(error: unknown) {
  return typeof DOMException !== 'undefined'
    && error instanceof DOMException
    && error.name === 'AbortError'
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

    try {
      await Share.share({
        title: options.title,
        text: options.text,
        files: [fileUri.uri],
        dialogTitle: options.title,
      })
    } catch (error) {
      if (isAbortError(error)) return 'cancelled'
      throw error
    }

    return 'native-share'
  }

  let canShareFile = false
  let file: File | undefined

  if (
    typeof File !== 'undefined'
    && typeof navigator.share === 'function'
    && typeof navigator.canShare === 'function'
  ) {
    file = new File([options.data], options.fileName, { type: 'application/json' })

    try {
      canShareFile = navigator.canShare({ files: [file] })
    } catch {
      canShareFile = false
    }
  }

  if (canShareFile && file) {
    try {
      await navigator.share({
        title: options.title,
        text: options.text,
        files: [file],
      })
      return 'web-share'
    } catch (error) {
      if (isAbortError(error)) return 'cancelled'
      throw error
    }
  }

  const blob = new Blob([options.data], { type: 'application/json' })
  const objectUrl = typeof URL.createObjectURL === 'function'
    ? URL.createObjectURL(blob)
    : `data:application/json;charset=utf-8,${encodeURIComponent(options.data)}`
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', objectUrl)
  linkElement.setAttribute('download', options.fileName)
  linkElement.style.display = 'none'
  document.body.appendChild(linkElement)

  try {
    linkElement.click()
  } finally {
    linkElement.remove()
    if (objectUrl.startsWith('blob:') && typeof URL.revokeObjectURL === 'function') {
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0)
    }
  }

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
