import { expect, test } from '@playwright/test'

test('creates a task in the browser app', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('locale', 'en')
    localStorage.setItem('darkMode', 'light')
  })

  await page.goto('/')

  await page.locator('#task-description').fill('Replace filter')
  await page.locator('#task-technician').fill('Ana')
  await page.getByRole('button', { name: /start/i }).click()

  await expect(page.getByText('Replace filter', { exact: true })).toBeVisible()
  await expect(page.getByText('Ana', { exact: true })).toBeVisible()
})
