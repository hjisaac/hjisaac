import { test, expect } from '@playwright/test';
import { SUPPORTED_LOCALES, localeContent, pathFor } from './support/locale-content';

// The articling submodule pipeline (ARTICLES_ENABLED + getCollection with
// a `published` filter) currently has zero published articles, so the
// Articles section should be absent — proves the pipeline runs cleanly end
// to end (no build/render crash) rather than testing specific content.
// Once real articles are published, this flips to asserting presence.
for (const locale of SUPPORTED_LOCALES) {
    test(`articling integration doesn't break the page (${locale})`, async ({ page }) => {
        const response = await page.goto(pathFor(locale));
        expect(response?.ok()).toBe(true);

        const { id } = localeContent[locale].sections.articles;
        await expect(page.locator(`section#${id}`)).toHaveCount(0);
    });
}
