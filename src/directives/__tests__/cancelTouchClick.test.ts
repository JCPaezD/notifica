import { describe, expect, it, vi } from 'vitest'

import { cancelTouchClickDirective } from '../cancelTouchClick'

describe('cancelTouchClickDirective', () => {
  it('prevents the synthetic click after a touch moves outside the element', () => {
    vi.setSystemTime(new Date('2026-05-25T08:00:00'))
    const element = mountDirectiveElement()

    dispatchTouchEvent(element, 'touchstart', {
      touches: [touch(1, 10, 10)],
      changedTouches: [touch(1, 10, 10)],
    })
    dispatchTouchEvent(element, 'touchmove', {
      touches: [touch(1, 200, 200)],
      changedTouches: [touch(1, 200, 200)],
    })
    dispatchTouchEvent(element, 'touchend', {
      touches: [],
      changedTouches: [touch(1, 200, 200)],
    })

    const click = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
    const preventDefault = vi.spyOn(click, 'preventDefault')
    const stopPropagation = vi.spyOn(click, 'stopPropagation')

    element.dispatchEvent(click)

    expect(preventDefault).toHaveBeenCalled()
    expect(stopPropagation).toHaveBeenCalled()
  })

  it('allows clicks when the touch remains inside the element', () => {
    vi.setSystemTime(new Date('2026-05-25T08:00:00'))
    const element = mountDirectiveElement()

    dispatchTouchEvent(element, 'touchstart', {
      touches: [touch(1, 10, 10)],
      changedTouches: [touch(1, 10, 10)],
    })
    dispatchTouchEvent(element, 'touchmove', {
      touches: [touch(1, 20, 20)],
      changedTouches: [touch(1, 20, 20)],
    })
    dispatchTouchEvent(element, 'touchend', {
      touches: [],
      changedTouches: [touch(1, 20, 20)],
    })

    const click = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
    const preventDefault = vi.spyOn(click, 'preventDefault')

    element.dispatchEvent(click)

    expect(preventDefault).not.toHaveBeenCalled()
  })
})

function mountDirectiveElement() {
  const element = document.createElement('button')
  element.getBoundingClientRect = vi.fn(() => ({
    left: 0,
    right: 100,
    top: 0,
    bottom: 100,
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }))

  cancelTouchClickDirective.mounted?.(element, {} as never, null, null)
  return element
}

function dispatchTouchEvent(
  element: HTMLElement,
  type: string,
  lists: { touches: unknown[]; changedTouches: unknown[] },
) {
  const event = new Event(type, {
    bubbles: true,
    cancelable: true,
  })

  Object.defineProperty(event, 'touches', { value: lists.touches })
  Object.defineProperty(event, 'changedTouches', { value: lists.changedTouches })
  element.dispatchEvent(event)
}

function touch(identifier: number, clientX: number, clientY: number) {
  return {
    identifier,
    clientX,
    clientY,
  }
}
