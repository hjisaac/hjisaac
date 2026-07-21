import { test, expect } from '@playwright/test';
import { SUPPORTED_LOCALES, localeContent, pathFor } from './support/locale-content';

// Confirms cvitae's resolved JSON actually flows through to the page —
// each CV-driven section has at least one real entry, both locales.
const CV_DRIVEN_SECTION_KEYS = ['experience', 'education', 'skills', 'projects', 'papers'] as const;

for (const locale of SUPPORTED_LOCALES) {
    test(`cvitae content renders (${locale})`, async ({ page }) => {
        await page.goto(pathFor(locale));

        const sections = localeContent[locale].sections;
        for (const key of CV_DRIVEN_SECTION_KEYS) {
            const id = sections[key].id;
            const section = page.locator(`section#${id}`);
            await expect(section).toBeVisible();
            await expect(section.locator('.entry, .skills-group')).not.toHaveCount(0);
        }
    });
}
