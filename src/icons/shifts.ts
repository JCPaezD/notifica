// src/icons/shifts.ts

import { h, defineComponent, type Component } from 'vue'

// --- Íconos de turnos ---
export const shiftIcons: Record<'morning' | 'afternoon' | 'night', Component> = {
  morning: defineComponent({
    render() {
      return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        strokeWidth: 1.5,
        stroke: 'currentColor',
        class: 'w-5 h-5'
      }, [
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M21,17H3m6.7436,0C8.8364,16.3152,8.25,15.2282,8.25,14.0042c0-2.071,1.6789-3.75,3.75-3.75s3.75,1.679,3.75,3.75c0,1.2239-0.5863,2.3109-1.4934,2.9954M12,5v2.25M5.25,13.9996H3M16.7727,9.2313L18.3637,7.6403M21,13.9996h-2.25M7.2273,9.2313L5.6363,7.6403'
        })
      ])
    }
  }),
  afternoon: defineComponent({
    render() {
      return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        strokeWidth: 1.5,
        stroke: 'currentColor',
        class: 'w-5 h-5'
      }, [
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
        })
      ])
    }
  }),
  night: defineComponent({
    render() {
      return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        strokeWidth: 1.5,
        stroke: 'currentColor',
        class: 'w-5 h-5'
      }, [
        h('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          d: 'M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
        })
      ])
    }
  })
}
