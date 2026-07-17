import { test, expect } from '@playwright/test';

test('locale switch round-trips EN -> FR -> EN, staying on the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    const toFr = page.locator('a.locale-switch');
    await expect(toFr).toHaveAttribute('hreflang', 'fr');
    await toFr.click();

    await expect(page).toHaveURL(/\/fr\/?$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

    const toEn = page.locator('a.locale-switch');
    await expect(toEn).toHaveAttribute('hreflang', 'en');
    await toEn.click();

    await expect(page).toHaveURL(/^http:\/\/[^/]+\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
