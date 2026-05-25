import { beforeEach, describe, expect, it, vi } from 'vitest'

const getPlatformMock = vi.fn()
const getInfoMock = vi.fn()

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    getPlatform: getPlatformMock,
  },
}))

vi.mock('@capacitor/device', () => ({
  Device: {
    getInfo: getInfoMock,
  },
}))

describe('platform', () => {
  beforeEach(() => {
    vi.resetModules()
    getPlatformMock.mockReset()
    getInfoMock.mockReset()
  })

  it('returns false outside Android', async () => {
    getPlatformMock.mockReturnValue('web')
    const { isAndroidApiAtLeast } = await import('../platform')

    await expect(isAndroidApiAtLeast(30)).resolves.toBe(false)
    expect(getInfoMock).not.toHaveBeenCalled()
  })

  it('checks the Android SDK version when running on Android', async () => {
    getPlatformMock.mockReturnValue('android')
    getInfoMock.mockResolvedValue({ androidSDKVersion: 35 })
    const { isAndroidApiAtLeast } = await import('../platform')

    await expect(isAndroidApiAtLeast(30)).resolves.toBe(true)
    await expect(isAndroidApiAtLeast(36)).resolves.toBe(false)
  })

  it('returns false if Device info cannot be read', async () => {
    getPlatformMock.mockReturnValue('android')
    getInfoMock.mockRejectedValue(new Error('Device unavailable'))
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const { isAndroidApiAtLeast } = await import('../platform')

    await expect(isAndroidApiAtLeast(30)).resolves.toBe(false)
  })
})
