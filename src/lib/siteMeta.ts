import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import type { SiteMeta } from './types';

const SITE_META_PATH = fileURLToPath(new URL('../../site_meta.yaml', import.meta.url));

export function loadSiteMeta(): SiteMeta {
    const raw = readFileSync(SITE_META_PATH, 'utf-8');
    const meta = yaml.load(raw) as SiteMeta;

    if (!meta?.nav || !meta.sections) {
        throw new Error(`Invalid site_meta.yaml at ${SITE_META_PATH} — missing "nav" or "sections".`);
    }

    return meta;
}
