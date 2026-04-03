import type { Directive } from 'vue'

type TouchClickState = {
  activeTouchId: number | null
  shouldCancelClick: boolean
}

type TouchClickableElement = HTMLElement & {
  __cancelTouchClickState__?: TouchClickState
  __cancelTouchClickOnStart__?: (event: TouchEvent) => void
  __cancelTouchClickOnMove__?: (event: TouchEvent) => void
  __cancelTouchClickOnEnd__?: () => void
  __cancelTouchClickOnClick__?: (event: MouseEvent) => void
}

const CANCEL_TOLERANCE_PX = 8

function isTouchInsideElement(
  touch: Touch,
  element: HTMLElement,
  tolerance = CANCEL_TOLERANCE_PX,
) {
  const rect = element.getBoundingClientRect()

  return (
    touch.clientX >= rect.left - tolerance &&
    touch.clientX <= rect.right + tolerance &&
    touch.clientY >= rect.top - tolerance &&
    touch.clientY <= rect.bottom + tolerance
  )
}

function getTrackedTouch(event: TouchEvent, touchId: number | null) {
  if (touchId === null) {
    return null
  }

  for (const touch of Array.from(event.changedTouches)) {
    if (touch.identifier === touchId) {
      return touch
    }
  }

  return null
}

export const cancelTouchClickDirective: Directive<HTMLElement> = {
  mounted(element) {
    const el = element as TouchClickableElement

    el.__cancelTouchClickState__ = {
      activeTouchId: null,
      shouldCancelClick: false,
    }

    el.__cancelTouchClickOnStart__ = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        el.__cancelTouchClickState__ = {
          activeTouchId: null,
          shouldCancelClick: false,
        }
        return
      }

      el.__cancelTouchClickState__ = {
        activeTouchId: event.touches[0].identifier,
        shouldCancelClick: false,
      }
    }

    el.__cancelTouchClickOnMove__ = (event: TouchEvent) => {
      const state = el.__cancelTouchClickState__
      const trackedTouch = getTrackedTouch(event, state?.activeTouchId ?? null)

      if (!state || !trackedTouch) {
        return
      }

      if (!isTouchInsideElement(trackedTouch, el)) {
        state.shouldCancelClick = true
      }
    }

    el.__cancelTouchClickOnEnd__ = () => {
      window.setTimeout(() => {
        if (!el.__cancelTouchClickState__) {
          return
        }

        el.__cancelTouchClickState__.activeTouchId = null
        el.__cancelTouchClickState__.shouldCancelClick = false
      }, 0)
    }

    el.__cancelTouchClickOnClick__ = (event: MouseEvent) => {
      if (el.__cancelTouchClickState__?.shouldCancelClick) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    el.addEventListener('touchstart', el.__cancelTouchClickOnStart__, {
      passive: true,
    })
    el.addEventListener('touchmove', el.__cancelTouchClickOnMove__, {
      passive: true,
    })
    el.addEventListener('touchend', el.__cancelTouchClickOnEnd__, {
      passive: true,
    })
    el.addEventListener('touchcancel', el.__cancelTouchClickOnEnd__, {
      passive: true,
    })
    el.addEventListener('click', el.__cancelTouchClickOnClick__, true)
  },

  unmounted(element) {
    const el = element as TouchClickableElement

    if (el.__cancelTouchClickOnStart__) {
      el.removeEventListener('touchstart', el.__cancelTouchClickOnStart__)
    }
    if (el.__cancelTouchClickOnMove__) {
      el.removeEventListener('touchmove', el.__cancelTouchClickOnMove__)
    }
    if (el.__cancelTouchClickOnEnd__) {
      el.removeEventListener('touchend', el.__cancelTouchClickOnEnd__)
      el.removeEventListener('touchcancel', el.__cancelTouchClickOnEnd__)
    }
    if (el.__cancelTouchClickOnClick__) {
      el.removeEventListener('click', el.__cancelTouchClickOnClick__, true)
    }

    delete el.__cancelTouchClickState__
    delete el.__cancelTouchClickOnStart__
    delete el.__cancelTouchClickOnMove__
    delete el.__cancelTouchClickOnEnd__
    delete el.__cancelTouchClickOnClick__
  },
}
