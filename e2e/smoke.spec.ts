import { test, expect } from '@playwright/test';
import { SUPPORTED_LOCALES, pathFor } from './support/locale-content';

// Just "does the site load", both locales — everything more specific
// (nav, locale switch, contact form, content pipelines) has its own spec.
for (const locale of SUPPORTED_LOCALES) {
    test(`site loads (${locale})`, async ({ page }) => {
        const response = await page.goto(pathFor(locale));
        expect(response?.ok()).toBe(true);
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page).toHaveTitle(/.+/);
    });
}
