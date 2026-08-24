import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('locale', 'en')
    localStorage.setItem('darkMode', 'light')
  })
})

async function createTask(page: import('@playwright/test').Page, description: string, technician = 'Ana') {
  await page.goto('/')
  await page.locator('#task-description').fill(description)
  await page.locator('#task-technician').fill(technician)
  await page.getByRole('button', { name: /^Start$/ }).click()
  await expect(page.getByText(description, { exact: true })).toBeVisible()
}

test('reopens a finished task and restores it with undo', async ({ page }) => {
  await createTask(page, 'Check compressor')

  await page.getByRole('button', { name: /^Finish$/ }).click()
  await expect(page.getByRole('button', { name: /^Reopen$/ })).toBeVisible()

  await page.getByRole('button', { name: /^Reopen$/ }).click()
  await expect(page.getByRole('button', { name: /^Finish$/ })).toBeVisible()
  const latestUndo = page.getByRole('button', { name: /^Undo$/ }).last()
  await expect(latestUndo).toBeVisible()

  await latestUndo.click()
  await expect(page.getByRole('button', { name: /^Reopen$/ })).toBeVisible()
})

test('creates and persists shift notes for the active segment', async ({ page }) => {
  await createTask(page, 'Inspect panel')

  await page.getByRole('button', { name: /Notes/ }).click()
  await page.getByPlaceholder(/Add note/).fill('Panel was already open')
  await page.keyboard.press('Tab')

  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem('notesByShiftId')))
    .toContain('Panel was already open')

  await page.reload()
  await page.getByRole('button', { name: /Notes/ }).click()
  await expect
    .poll(async () => page.locator('textarea').evaluateAll(
      elements => elements.map(element => (element as HTMLTextAreaElement).value)
    ))
    .toContain('Panel was already open')
})

test('restores persisted notes open and visible after reopening the app', async ({ page }) => {
  await createTask(page, 'Restore notes')

  const notesButton = page.getByRole('button', { name: /Notes/ })
  await notesButton.click()

  await page.getByPlaceholder('Add note…', { exact: true }).fill('First persisted note')
  await page.keyboard.press('Tab')
  await page.getByPlaceholder('Add note…', { exact: true }).fill('Second persisted note')
  await page.keyboard.press('Tab')
  await expect(page.getByPlaceholder('Note', { exact: true })).toHaveCount(2)

  await page.reload()

  const restoredNotesButton = page.getByRole('button', { name: /Notes/ })
  await expect(restoredNotesButton).toHaveAttribute('aria-expanded', 'true')

  const restoredNotes = page.getByPlaceholder('Note', { exact: true })
  await expect(restoredNotes).toHaveCount(2)
  await expect(restoredNotes.nth(0)).toBeVisible()
  await expect(restoredNotes.nth(0)).toHaveValue('First persisted note')
  await expect(restoredNotes.nth(1)).toBeVisible()
  await expect(restoredNotes.nth(1)).toHaveValue('Second persisted note')
})

test('opens settings and updates theme and language preferences', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /Open menu/i }).click()
  await page.getByRole('button', { name: /^Settings$/ }).click()

  await expect(page.getByRole('button', { name: /^Dark$/ })).toBeVisible()

  await page.getByRole('button', { name: /^Dark$/ }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await expect.poll(async () => page.evaluate(() => localStorage.getItem('darkMode'))).toBe('dark')

  await page.getByRole('button', { name: /^Light$/ }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await expect.poll(async () => page.evaluate(() => localStorage.getItem('darkMode'))).toBe('light')

  await page.getByRole('button', { name: /^ES$/ }).click()
  await expect.poll(async () => page.evaluate(() => localStorage.getItem('locale'))).toBe('es')
  await expect(page.getByRole('button', { name: /^Oscuro$/ })).toBeVisible()

  await page.getByRole('button', { name: /^EN$/ }).click()
  await expect.poll(async () => page.evaluate(() => localStorage.getItem('locale'))).toBe('en')
  await expect(page.getByRole('button', { name: /^Dark$/ })).toBeVisible()

  const keepScreenAwake = page.getByRole('switch', { name: /^Keep screen on$/ })
  await expect(keepScreenAwake).toHaveAttribute('aria-checked', 'false')
  await keepScreenAwake.click()
  await expect.poll(async () => page.evaluate(() => localStorage.getItem('keepScreenAwake'))).toBe('true')
  await expect(keepScreenAwake).toHaveAttribute('aria-checked', 'true')

  await page.reload()
  await page.getByRole('button', { name: /Open menu/i }).click()
  await page.getByRole('button', { name: /^Settings$/ }).click()
  await expect(page.getByRole('switch', { name: /^Keep screen on$/ })).toHaveAttribute('aria-checked', 'true')
})

test('does not show the retired release notice in the PWA', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText(/^New version$/)).toHaveCount(0)

  await page.getByRole('button', { name: /Open menu/i }).click()
  await expect(page.getByRole('button', { name: /What's new/i })).toHaveCount(0)
})

test('exports a JSON backup through the browser download flow', async ({ page }) => {
  await createTask(page, 'Export backup')

  await page.getByRole('button', { name: /Open menu/i }).click()
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: /^Export$/ }).click()

  const download = await downloadPromise
  expect(download.suggestedFilename()).toMatch(/^notifica-backup-\d{4}-\d{2}-\d{2}\.json$/)
})
