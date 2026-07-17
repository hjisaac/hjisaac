import { test, expect } from '@playwright/test';
import { SUPPORTED_LOCALES, pathFor } from './support/locale-content';

// Content-agnostic structural invariant: every nav item must point at a
// rendered section, and every rendered section must be reachable from nav.
// Validates CvPage.astro's "hide empty sections (and their nav entry)"
// logic without hardcoding which sections happen to have content today.
for (const locale of SUPPORTED_LOCALES) {
    test(`nav items exactly match rendered sections (${locale})`, async ({ page }) => {
        await page.goto(pathFor(locale));

        const navHrefs = await page
            .locator('#site-nav a[href]')
            .evaluateAll((links) => links.map((a) => a.getAttribute('href')?.replace(/^#/, '') ?? ''));
        const sectionIds = await page.locator('section[id]').evaluateAll((sections) => sections.map((s) => s.id));

        expect(navHrefs.length).toBeGreaterThan(0);
        expect([...navHrefs].sort()).toEqual([...sectionIds].sort());
    });
}
