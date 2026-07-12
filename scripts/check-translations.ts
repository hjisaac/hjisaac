import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { siteLocale as en } from '../src/i18n/site_locale/en';
import { siteLocale as fr } from '../src/i18n/site_locale/fr';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../src/i18n/locales';

const errors: string[] = [];

function collectStringPaths(value: unknown, path: string, out: Map<string, string>): void {
    if (typeof value === 'string') {
        out.set(path, value);
        return;
    }
    if (Array.isArray(value)) {
        value.forEach((item, i) => collectStringPaths(item, `${path}[${i}]`, out));
        return;
    }
    if (value && typeof value === 'object') {
        for (const [key, child] of Object.entries(value)) {
            collectStringPaths(child, path ? `${path}.${key}` : key, out);
        }
    }
}

function checkSiteLocale(): void {
    const baseline = new Map<string, string>();
    collectStringPaths(en, '', baseline);

    const others: Partial<Record<string, unknown>> = { fr };

    for (const [locale, data] of Object.entries(others)) {
        const strings = new Map<string, string>();
        collectStringPaths(data, '', strings);

        for (const path of baseline.keys()) {
            const value = strings.get(path);
            if (value === undefined) {
                errors.push(`[site_locale/${locale}.ts] missing key: ${path}`);
            } else if (value.trim() === '') {
                errors.push(`[site_locale/${locale}.ts] empty value at: ${path}`);
            }
        }
        for (const path of strings.keys()) {
            if (!baseline.has(path)) {
                errors.push(`[site_locale/${locale}.ts] stale key not in en.ts: ${path}`);
            }
        }
    }
}

function checkCvContent(): void {
    const enPath = fileURLToPath(new URL(`../cvitae/outputs/${DEFAULT_LOCALE}/general.json`, import.meta.url));
    const enData = JSON.parse(readFileSync(enPath, 'utf-8'));
    const enStrings = new Map<string, string>();
    collectStringPaths(enData, '', enStrings);

    for (const locale of SUPPORTED_LOCALES) {
        if (locale === DEFAULT_LOCALE) continue;

        const localePath = fileURLToPath(new URL(`../cvitae/outputs/${locale}/general.json`, import.meta.url));
        const localeData = JSON.parse(readFileSync(localePath, 'utf-8'));
        const localeStrings = new Map<string, string>();
        collectStringPaths(localeData, '', localeStrings);

        for (const [path, enValue] of enStrings) {
            if (enValue.trim() === '') continue; // nothing to translate
            const localeValue = localeStrings.get(path);
            if (localeValue === undefined || localeValue.trim() === '') {
                errors.push(
                    `[cvitae/outputs/${locale}/general.json] blank/missing at: ${path} (en: "${enValue.slice(0, 60)}")`,
                );
            }
        }
    }
}

checkSiteLocale();
checkCvContent();

if (errors.length > 0) {
    console.error(`\n✗ Translation completeness check failed (${errors.length} issue(s)):\n`);
    errors.forEach((e) => console.error(`  - ${e}`));
    console.error('\nFix these before building/deploying.\n');
    process.exit(1);
}

console.log('✓ All locales fully translated.');
