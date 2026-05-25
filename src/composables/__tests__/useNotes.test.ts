import { beforeEach, describe, expect, it } from 'vitest'

import {
  deleteAllNotes,
  deleteNotesForShift,
  getAllNotes,
  getNotesForShift,
  setAllNotes,
  setNotesForShift,
} from '../useNotes'

describe('useNotes', () => {
  beforeEach(() => {
    deleteAllNotes()
  })

  it('sets, reads and persists notes by shift', () => {
    setNotesForShift('shift-1', ['First', 'Second'])

    expect(getNotesForShift('shift-1')).toEqual(['First', 'Second'])
    expect(JSON.parse(localStorage.getItem('notesByShiftId') ?? '{}')).toEqual({
      'shift-1': ['First', 'Second'],
    })
  })

  it('removes a shift when its notes become empty', () => {
    setNotesForShift('shift-1', ['First'])
    setNotesForShift('shift-1', [])

    expect(getNotesForShift('shift-1')).toEqual([])
    expect(getAllNotes()).toEqual({})
  })

  it('deletes one shift without touching the rest', () => {
    setAllNotes({
      'shift-1': ['One'],
      'shift-2': ['Two'],
    })

    deleteNotesForShift('shift-1')

    expect(getAllNotes()).toEqual({
      'shift-2': ['Two'],
    })
  })
})
