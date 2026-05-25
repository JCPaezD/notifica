import { beforeEach, describe, expect, it, vi } from 'vitest'

const isNativePlatformMock = vi.fn()
const writeFileMock = vi.fn()
const getUriMock = vi.fn()
const canShareMock = vi.fn()
const shareMock = vi.fn()

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

  it('exports JSON through a web download outside native platforms', async () => {
    isNativePlatformMock.mockReturnValue(false)
    const link = document.createElement('a')
    const click = vi.spyOn(link, 'click').mockImplementation(() => undefined)
    vi.spyOn(document, 'createElement').mockReturnValue(link)
    const { exportJsonBackup } = await import('../shareExportAdapters')

    await expect(exportJsonBackup({
      fileName: 'backup.json',
      data: '{}',
      title: 'Export',
      text: 'Backup',
    })).resolves.toBe('web-download')

    expect(link.getAttribute('download')).toBe('backup.json')
    expect(click).toHaveBeenCalled()
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
