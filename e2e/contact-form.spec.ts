import { test, expect } from '@playwright/test';
import { SUPPORTED_LOCALES, pathFor } from './support/locale-content';

// Just "does the form work" — fill it in, submit, get some feedback. Not
// asserting exact translated wording or every edge case (missing key vs.
// success vs. already-unlocked) — that's more detail than this needs.
for (const locale of SUPPORTED_LOCALES) {
    test(`contact form responds to submission (${locale})`, async ({ page }) => {
        await page.goto(pathFor(locale));

        await page.locator('#contact-form textarea[name="message"]').fill('Hello from e2e');
        await page.locator('#contact-form button[type="submit"]').click();

        await expect(page.locator('#contact-form-status')).not.toBeEmpty();
    });
}
