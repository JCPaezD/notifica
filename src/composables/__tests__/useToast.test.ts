import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useToast } from '../useToast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useToast().toasts.value = []
  })

  it('auto-removes ordinary toasts after their duration', () => {
    const { add, toasts } = useToast()

    add({ title: 'Saved' }, 1000)
    expect(toasts.value).toHaveLength(1)

    vi.advanceTimersByTime(1000)
    expect(toasts.value).toHaveLength(0)
  })

  it('keeps delayClose toasts until their dismiss timer is started', () => {
    const { add, startDismissTimer, toasts } = useToast()

    const id = add({ title: 'Deleted', delayClose: true }, 1000)
    vi.advanceTimersByTime(1000)
    expect(toasts.value).toHaveLength(1)

    startDismissTimer(id, 1000)
    vi.advanceTimersByTime(1000)
    expect(toasts.value).toHaveLength(0)
  })

  it('does not start duplicate dismiss timers for the same toast', () => {
    const onDismiss = vi.fn()
    const { add, startDismissTimer, toasts } = useToast()

    const id = add({ title: 'Deleted', delayClose: true, onDismiss })

    startDismissTimer(id, 1000)
    startDismissTimer(id, 1000)
    vi.advanceTimersByTime(1000)

    expect(toasts.value).toHaveLength(0)
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('never auto-removes persistent toasts', () => {
    const { add, startDismissTimer, toasts } = useToast()

    const id = add({ title: 'Persistent', persistent: true }, 1000)
    startDismissTimer(id, 1000)
    vi.advanceTimersByTime(5000)

    expect(toasts.value).toHaveLength(1)
  })
})
