import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { compile } from 'json-schema-to-typescript';

const SCHEMA_PATH = fileURLToPath(new URL('../cvitae/outputs/schema.json', import.meta.url));
const OUTPUT_PATH = fileURLToPath(new URL('../src/lib/types.generated.ts', import.meta.url));

const schemas = JSON.parse(readFileSync(SCHEMA_PATH, 'utf-8'));

const parts = [];
for (const [name, schema] of Object.entries(schemas)) {
    const ts = await compile(schema, name, { bannerComment: '', additionalProperties: false });
    parts.push(ts.trim());
}

const header = '/** AUTO-GENERATED from cvitae/outputs/schema.json — run: npm run gen:types **/\n\n';
writeFileSync(OUTPUT_PATH, header + parts.join('\n\n') + '\n');

console.log(`Generated ${OUTPUT_PATH}`);
