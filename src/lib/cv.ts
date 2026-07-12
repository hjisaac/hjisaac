import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { CvData, CvSection } from './types';

export function loadCv(locale: string): CvData {
    const cvPath = fileURLToPath(new URL(`../../cvitae/outputs/${locale}/general.json`, import.meta.url));
    const raw = readFileSync(cvPath, 'utf-8');
    const cv = JSON.parse(raw) as CvData;

    if (!cv?.name || !Array.isArray(cv.sections)) {
        throw new Error(
            `Invalid cvitae build output at ${cvPath} — missing "name" or "sections". ` +
            'Run `cd cvitae && make build` to (re)generate it.',
        );
    }

    return cv;
}

export function getSection<T>(cv: CvData, type: string): T[] {
    const section = cv.sections.find((s: CvSection<unknown>) => s.type === type);
    return (section?.entries ?? []) as T[];
}
