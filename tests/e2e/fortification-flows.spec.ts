import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('locale', 'en')
    localStorage.setItem('darkMode', 'light')
    localStorage.setItem('notifica-release-notice-dismissed', 'true')
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
})
