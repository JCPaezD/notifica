import { beforeEach, describe, expect, it, vi } from 'vitest'

const isNativePlatformMock = vi.fn()
const writeFileMock = vi.fn()
const getUriMock = vi.fn()
const canShareMock = vi.fn()
const shareMock = vi.fn()
const webCanShareMock = vi.fn()
const webShareMock = vi.fn()

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: isNativePlatformMock,
  },
}))

vi.mock('@capacitor/filesystem', () => ({
  Directory: {
    Cache: 'CACHE',
  },
  Encoding: {
    UTF8: 'utf8',
  },
  Filesystem: {
    writeFile: writeFileMock,
    getUri: getUriMock,
  },
}))

vi.mock('@capacitor/share', () => ({
  Share: {
    canShare: canShareMock,
    share: shareMock,
  },
}))

describe('shareExportAdapters', () => {
  beforeEach(() => {
    vi.resetModules()
    isNativePlatformMock.mockReset()
    writeFileMock.mockReset()
    getUriMock.mockReset()
    canShareMock.mockReset()
    shareMock.mockReset()
    webCanShareMock.mockReset()
    webShareMock.mockReset()
    Object.defineProperty(navigator, 'canShare', {
      configurable: true,
      value: undefined,
    })
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: undefined,
    })
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
  })

  it('exports JSON through Capacitor on native platforms', async () => {
    isNativePlatformMock.mockReturnValue(true)
    getUriMock.mockResolvedValue({ uri: 'file://backup.json' })
    const { exportJsonBackup } = await import('../shareExportAdapters')

    await expect(exportJsonBackup({
      fileName: 'backup.json',
      data: '{}',
      title: 'Export',
      text: 'Backup',
    })).resolves.toBe('native-share')

    expect(writeFileMock).toHaveBeenCalledWith(expect.objectContaining({
      path: 'backup.json',
      data: '{}',
    }))
    expect(shareMock).toHaveBeenCalledWith(expect.objectContaining({
      files: ['file://backup.json'],
    }))
  })

  it('shares JSON through the Web Share API when file sharing is available', async () => {
    isNativePlatformMock.mockReturnValue(false)
    webCanShareMock.mockReturnValue(true)
    webShareMock.mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'canShare', {
      configurable: true,
      value: webCanShareMock,
    })
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: webShareMock,
    })
    const { exportJsonBackup } = await import('../shareExportAdapters')

    await expect(exportJsonBackup({
      fileName: 'backup.json',
      data: '{}',
      title: 'Export',
      text: 'Backup',
    })).resolves.toBe('web-share')

    expect(webCanShareMock).toHaveBeenCalledWith({ files: [expect.any(File)] })
    expect(webShareMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Export',
      text: 'Backup',
      files: [expect.any(File)],
    }))
  })

  it('exports JSON through a web download outside native platforms', async () => {
    isNativePlatformMock.mockReturnValue(false)
    const createObjectUrl = vi.fn(() => 'blob:backup')
    const revokeObjectUrl = vi.fn()
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectUrl,
    })
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectUrl,
    })
    let clickedLink: HTMLAnchorElement | undefined
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
      clickedLink = this
    })
    const { exportJsonBackup } = await import('../shareExportAdapters')

    await expect(exportJsonBackup({
      fileName: 'backup.json',
      data: '{}',
      title: 'Export',
      text: 'Backup',
    })).resolves.toBe('web-download')

    expect(clickedLink?.getAttribute('href')).toBe('blob:backup')
    expect(clickedLink?.getAttribute('download')).toBe('backup.json')
    expect(createObjectUrl).toHaveBeenCalledWith(expect.any(Blob))
    expect(revokeObjectUrl).not.toHaveBeenCalled()
  })

  it('does not report success when web file sharing is cancelled', async () => {
    isNativePlatformMock.mockReturnValue(false)
    webCanShareMock.mockReturnValue(true)
    webShareMock.mockRejectedValue(new DOMException('User cancelled', 'AbortError'))
    Object.defineProperty(navigator, 'canShare', {
      configurable: true,
      value: webCanShareMock,
    })
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: webShareMock,
    })
    const { exportJsonBackup } = await import('../shareExportAdapters')

    await expect(exportJsonBackup({
      fileName: 'backup.json',
      data: '{}',
      title: 'Export',
      text: 'Backup',
    })).resolves.toBe('cancelled')
  })

  it('shares text through Capacitor when available', async () => {
    canShareMock.mockResolvedValue({ value: true })
    const { sharePlainText } = await import('../shareExportAdapters')

    await expect(sharePlainText({
      nativeTitle: 'Native',
      webTitle: 'Web',
      dialogTitle: 'Share',
      text: 'Text',
    })).resolves.toBe('native-share')

    expect(shareMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Native',
      text: 'Text',
    }))
  })

  it('falls back to the clipboard when native and web share are unavailable', async () => {
    canShareMock.mockResolvedValue({ value: false })
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: undefined,
    })
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
    const { sharePlainText } = await import('../shareExportAdapters')

    await expect(sharePlainText({
      nativeTitle: 'Native',
      webTitle: 'Web',
      dialogTitle: 'Share',
      text: 'Text',
    })).resolves.toBe('clipboard')
  })
})
