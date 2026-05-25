import { describe, expect, it } from 'vitest'

import en from '../en'
import es from '../es'

describe('i18n locale parity', () => {
  it('keeps English and Spanish locale keys aligned', () => {
    expect(flattenKeys(en)).toEqual(flattenKeys(es))
  })
})

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return [prefix]
  }

  return Object.entries(value)
    .flatMap(([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key))
    .sort()
}
