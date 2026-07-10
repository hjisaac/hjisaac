import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { CvData, CvSection } from './types';

const CV_PATH = fileURLToPath(new URL('../../cvitae/outputs/en/general.json', import.meta.url));

export function loadCv(): CvData {
    const raw = readFileSync(CV_PATH, 'utf-8');
    const cv = JSON.parse(raw) as CvData;

    if (!cv?.name || !Array.isArray(cv.sections)) {
        throw new Error(
            `Invalid cvitae build output at ${CV_PATH} — missing "name" or "sections". ` +
            'Run `cd cvitae && make build` to (re)generate it.',
        );
    }

    return cv;
}

export function getSection<T>(cv: CvData, type: string): T[] {
    const section = cv.sections.find((s: CvSection<unknown>) => s.type === type);
    return (section?.entries ?? []) as T[];
}
