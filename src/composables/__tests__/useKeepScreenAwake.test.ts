import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'

const mocks = vi.hoisted(() => ({
  getPlatform: vi.fn(),
  isPluginAvailable: vi.fn(),
  setEnabled: vi.fn(),
}))

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    getPlatform: mocks.getPlatform,
    isPluginAvailable: mocks.isPluginAvailable,
  },
  registerPlugin: vi.fn(() => ({
    setEnabled: mocks.setEnabled,
  })),
}))

describe('useKeepScreenAwake', () => {
  let wrapper: VueWrapper | undefined

  beforeEach(() => {
    vi.resetModules()
    localStorage.clear()
    mocks.getPlatform.mockReturnValue('web')
    mocks.isPluginAvailable.mockReturnValue(false)
    mocks.setEnabled.mockReset()
    mocks.setEnabled.mockResolvedValue(undefined)
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'visible',
    })
    Object.defineProperty(navigator, 'wakeLock', {
      configurable: true,
      value: undefined,
    })
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.restoreAllMocks()
  })

  async function mountHost() {
    const { useKeepScreenAwake } = await import('../useKeepScreenAwake')
    wrapper = mount(defineComponent({
      setup() {
        return useKeepScreenAwake()
      },
      template: '<div />',
    }))
    await flushPromises()
    return wrapper
  }

  it('defaults to disabled and does not request unsupported wake locks', async () => {
    const mounted = await mountHost()

    expect(mounted?.vm.keepScreenAwake).toBe(false)
    expect(localStorage.getItem('keepScreenAwake')).toBeNull()
  })

  it('requests and releases the web wake lock as the setting and visibility change', async () => {
    const release = vi.fn().mockResolvedValue(undefined)
    const addEventListener = vi.fn()
    const request = vi.fn().mockResolvedValue({
      released: false,
      release,
      addEventListener,
    })
    Object.defineProperty(navigator, 'wakeLock', {
      configurable: true,
      value: { request },
    })

    const mounted = await mountHost()
    mounted?.vm.setKeepScreenAwake(true)
    await nextTick()
    await flushPromises()

    expect(request).toHaveBeenCalledWith('screen')
    expect(localStorage.getItem('keepScreenAwake')).toBe('true')

    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
    await flushPromises()
    expect(release).toHaveBeenCalledTimes(1)

    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' })
    document.dispatchEvent(new Event('visibilitychange'))
    await flushPromises()
    expect(request).toHaveBeenCalledTimes(2)
  })

  it('uses the native Android bridge when available', async () => {
    mocks.getPlatform.mockReturnValue('android')
    mocks.isPluginAvailable.mockReturnValue(true)

    const mounted = await mountHost()
    mounted?.vm.setKeepScreenAwake(true)
    await nextTick()
    await flushPromises()
    expect(mocks.setEnabled).toHaveBeenCalledWith({ enabled: true })

    mounted?.vm.setKeepScreenAwake(false)
    await nextTick()
    await flushPromises()
    expect(mocks.setEnabled).toHaveBeenLastCalledWith({ enabled: false })
  })
})
