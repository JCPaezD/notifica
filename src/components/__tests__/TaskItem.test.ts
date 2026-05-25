import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { describe, expect, it, vi } from 'vitest'

import TaskItem from '../TaskItem.vue'
import en from '@/locales/en'
import es from '@/locales/es'
import type { Task } from '@/types/Task'

describe('TaskItem', () => {
  it('emits finish-task when the main action is clicked on an active task', async () => {
    const wrapper = mountTaskItem(createTask({ endTime: undefined }))

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('finish-task')).toEqual([['task-1']])
  })

  it('emits reactivate-task when reopening a finished task', async () => {
    const wrapper = mountTaskItem(createTask({
      endTime: new Date('2026-05-25T09:00:00'),
    }))

    await wrapper.findAll('button')[0].trigger('click')

    expect(wrapper.emitted('reactivate-task')).toEqual([['task-1']])
  })

  it('shows rounded duration for tasks crossing midnight', () => {
    const wrapper = mountTaskItem(createTask({
      startTime: new Date('2026-05-25T23:30:00'),
      endTime: new Date('2026-05-26T01:00:00'),
    }))

    expect(wrapper.text()).toContain('1.5 h')
  })

  it('emits update-task when the notified state is toggled', async () => {
    const task = createTask({
      endTime: new Date('2026-05-25T09:00:00'),
      isNotified: false,
    })
    const wrapper = mountTaskItem(task)

    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('update-task')?.[0][0]).toMatchObject({
      id: task.id,
      isNotified: true,
    })
  })

  it('asks confirmation before emitting delete-task', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    const wrapper = mountTaskItem(createTask({
      endTime: new Date('2026-05-25T09:00:00'),
    }))

    const buttons = wrapper.findAll('button')
    await buttons[2].trigger('click')

    expect(wrapper.emitted('delete-task')).toEqual([['task-1']])
  })
})

function mountTaskItem(task: Task) {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, es },
  })

  return mount(TaskItem, {
    props: {
      task,
    },
    global: {
      plugins: [i18n],
      directives: {
        cancelTouchClick: {},
      },
    },
  })
}

function createTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-1',
    description: 'Replace filter',
    startTime: new Date('2026-05-25T08:00:00'),
    technician: 'Ana',
    isNotified: false,
    shiftId: 'shift-1764565200000',
    ...overrides,
  }
}
